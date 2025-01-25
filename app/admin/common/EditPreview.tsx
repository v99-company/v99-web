"use client"

import { IMAGE_FILES_URL } from "@/app/utils/strings";
import { Button } from "@/components/ui/button"
import { Trash2, PenSquare, Download, FileText } from 'lucide-react'
import Image from "next/image"

interface EditPreviewProps {
  file: string;
  onDelete: (file: string) => void;  // Modified to accept the file parameter
}

export function EditPreview({ file, onDelete }: EditPreviewProps) {
    // Function to construct the image source
    const getImageSrc = (fileName: string) => {
      // Check if fileName is a valid URL or starts with a leading slash
      if (!fileName.startsWith('/') && !fileName.startsWith('http://') && !fileName.startsWith('https://')) {
        return `${IMAGE_FILES_URL}/${fileName}`; // Prepend base URL
      }
      return fileName; // Return as is if it's already a valid URL
    };

  return (
    <div className="w-full space-y-2 ml-4 mt-2">
     {file && 
     <main>    
     <div className="mt-2">
        
          <div className="relative w-32 h-32 rounded-md overflow-hidden">
            <Image
              unoptimized
              src={getImageSrc(file)}
              width={200}
              height={200}
              alt="Preview"
              className="object-contain w-full h-full"
            />
          </div>        
        
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onDelete(file)}  // Modified to pass the file
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
      </main>
      }
    </div>
  )
}