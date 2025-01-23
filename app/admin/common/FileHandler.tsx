import { use, useEffect, useMemo, useState } from "react";
import { EditPreview } from "./EditPreview";
import { FileUploader } from "./FileUploader";

interface FileHandlerProps {
  isEdit: boolean;
  label: string;
  correspondantFileType: string;
  file: string;
  onFileUpload: (data: string[] | null) => void;
  onFileDelete: (fileName: string) => void;
}

export const FileHandler: React.FC<FileHandlerProps> = ({
    isEdit=false,
    label,
    correspondantFileType,
    file,
    onFileUpload,
    onFileDelete
  }) => {

  const [isFileEdit, setIsFileEdit] = useState(false);

  useEffect(() => {
    if (file){ 
      setIsFileEdit(true);
    }else{
      setIsFileEdit(false);
    }
  }, [file]);


  const handleDelete = async (fileName: string) => {
    try {
      console.log("Deleting file:", fileName);
        onFileDelete(fileName);
      } catch (error) {
        console.error("Error during file deletion:", error);
      }
    setIsFileEdit(false);
    onFileUpload(null);
  };

  return (
    <div>
      {isFileEdit ? (
        <EditPreview
          file={file}
          onDelete={() => handleDelete(file)}
        />
      ) : (
        <FileUploader
          onFileUpload={(data) => {
            onFileUpload(data);
            setIsFileEdit(true);
          }}
          label={label}
          correspondantFileType={correspondantFileType}
        />
      )}
    </div>
  );
};
