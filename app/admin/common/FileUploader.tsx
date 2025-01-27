"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, Check, ImageIcon } from 'lucide-react'
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  onFileUpload: (data: string[] | null) => void;
  label: string;
  correspondantFileType: string;
  isMultiple?: boolean;
}

export function FileUploader({ onFileUpload, label, correspondantFileType, isMultiple = true}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = useCallback((file: File) => {
    setUploadedFiles([]); // Reset uploaded files
    setSelectedFiles(isMultiple ? (prevFiles) => [...prevFiles, file] : [file]); // Limit to single file if isMultiple is false

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrls(isMultiple ? (prevUrls) => [...prevUrls, reader.result as string] : [reader.result as string]);
    };
    reader.readAsDataURL(file);
  }, [isMultiple]);


  const handleFileUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    const formData = new FormData()
    selectedFiles.forEach((file) => formData.append("file[]", file))
  
    try {
      const token = localStorage.getItem("loginToken")
      
      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100
          setUploadProgress(progress)
        }
      }
 
      xhr.onload = async () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          const filePaths = data.map((file: { file_name: string }) =>
            file.file_name.replace("../", "")
          )
 
          const uploadedFileData = data.map((file: { file_name: string; file_path: string }) => ({
            name: file.file_name,
            url: file.file_path.replace("../", ""),
          }))
 
          setUploadedFiles((prev) => [...prev, ...uploadedFileData])
          onFileUpload(filePaths)
          setSelectedFiles([])
          setPreviewUrls([])
        }
        setIsUploading(false)
        setUploadProgress(0)
      }
 
      xhr.onerror = () => {
        console.error("Upload failed")
        setIsUploading(false)
        setUploadProgress(0)
      }
 
      xhr.open("POST", "/api/file")
      xhr.setRequestHeader("Authorization", `Bearer ${token}`)
      xhr.send(formData)
      
    } catch (error) {
      console.error("Error uploading files:", error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [selectedFiles, onFileUpload])
  

  const handleDelete = useCallback((fileToDelete: File, index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index))
    if (uploadedFiles.length > 0) {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
  }, [uploadedFiles])

  return (
    <div className="space-y-4 mt-2">
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const files = Array.from(e.target.files);
              if (!isMultiple && files.length > 1) {
                alert("You can only select one file at a time.");
                return;
              }
              files.forEach((file) => handleFileSelect(file));
            }
          }}
          className="hidden"
          id={`${label}-upload`}
          accept=".jpg,.jpeg,.png" // Accept specified file types
          multiple={isMultiple} // Dynamic multiple attribute
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById(`${label}-upload`)?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Select Files
        </Button>
        {selectedFiles.length > 0 && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleFileUpload}
          >
            <Check className="w-4 h-4 mr-2" />
            Confirm Upload
          </Button>
        )}
      </div>

      <div className="flex items-start justify-start space-x-4 ml-4">
        <div className="grid grid-cols-4 gap-2">
        {previewUrls.map((previewUrl, index) => (
          <div key={index} className="mt-2 relative">
            <div className="relative w-32 h-32 rounded-md overflow-hidden">
              <Image
                unoptimized
                src={previewUrl}
                width={200}
                height={200}
                alt={`Preview-${index}`}
                className="object-contain w-full h-full"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0 bg-white bg-opacity-50 border border-gray-300 rounded-md"
              onClick={() => handleDelete(selectedFiles[index], index)}
            >
              <X className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
        ))}
        </div>

        {selectedFiles.length > 0 && previewUrls.length === 0 && (
          <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-2">
            <span className="text-sm text-gray-700 truncate max-w-[150px]">
              {selectedFiles[0].name}
            </span>
            <a
              href={URL.createObjectURL(selectedFiles[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Document
            </a>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(selectedFiles[0], 0)}
            >
              <X className="w-4 h-4 cursor-pointer" />
            </Button>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-2 flex items-center space-x-2">
          <ImageIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            Files uploaded successfully
          </span>
        </div>
      )}

      {isUploading && (
       <div className="w-full max-w-xs mx-2">
         <Progress value={uploadProgress} className="w-full" />
         <p className="text-sm text-gray-500 mt-1">Uploading: {Math.round(uploadProgress)}%</p>
       </div>
      )}

    </div>
  );
}
