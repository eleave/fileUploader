import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { FileUploaderOnRemove, FileUploaderonAttachmentCheck } from "./types";
import { FileObject } from "./handlers/fileObject";
import { DropFileMessage } from "./elements/DropFileMessage";
import { IsUploadedMessage } from "./elements/IsUploadedMessage";
import { IsLoadingMessage } from "./elements/IsLoadingMessage";
import { DefaultMessage } from "./elements/DefaultMessage";
import { FileSummary } from "./elements/FileSummary";
import styles, { SmallSizeClassName } from "./styles";
import {
  downloadFile,
  processFile,
  getFileByUrl,
  markFileAsUploaded,
  markAllAttachmentsAsSelected,
  markFileAsFailed,
} from "./utility";
import { Box } from "@mui/system";

export { FileObject, getFileByUrl, processFile, downloadFile };
export interface FileUploaderProps {
  /** Size of the file uploader. */
  size?: "sm" | "md";
  /** Function to apply the fileQueue object for uploading. The uploading logic is implemented externally. */
  uploadFiles: (fileQueue: FileObject[]) => Promise<void | boolean>;
  /** Automatically uploads files when added, or allows manual upload confirmation through a button. */
  autoUpload?: boolean;
  /** Initial files to be pre-loaded into the file uploader component. */
  initialFiles?: File[];
  /** Determines if initial files should be uploaded to the server or just displayed if they were previously uploaded. */
  initialFilesAreUploaded?: boolean;
  /** Sets file objects in an external state. */
  setFiles?: React.Dispatch<React.SetStateAction<FileObject[]>>;
  /** Toggles the visibility of the upload button. Can be used in conjunction with the autoUpload property. */
  hideButton?: boolean;
  /** Clears the file queue after the files have been uploaded. */
  clearFilesAfterUploading?: boolean;
  /** Automatically selects all attachments for EML and MSG files. */
  selectAllAttachmentsByDefault?: boolean;
  /** Limits the file size in megabytes. */
  sizeLimitMb?: number;
  /** Indicates the loading status of an external state. */
  isLoadingExternal?: boolean;
  /** Sets the loading status of an external component. */
  setIsLoadingExternal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  size = "md",
  uploadFiles,
  autoUpload,
  initialFiles,
  setFiles,
  hideButton,
  initialFilesAreUploaded = false,
  clearFilesAfterUploading = true,
  selectAllAttachmentsByDefault = false,
  sizeLimitMb = 0,
  isLoadingExternal,
  setIsLoadingExternal,
}) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fileQueue, setFileQueue] = useState<FileObject[]>([]);

  const [isLoadingInternal, setIsLoadingInternal] = useState(false);
  const isLoading = isLoadingExternal || isLoadingInternal;
  const setIsLoading = setIsLoadingExternal || setIsLoadingInternal;

  const parseFiles = async (files: File[]) => {
    try {
      setDisabled(false);
      setIsUploaded(false);
      setIsLoading(true);

      let fileObjects = await Promise.all(files.map(processFile));

      if (selectAllAttachmentsByDefault) {
        fileObjects = fileObjects.map((fileObject) => markAllAttachmentsAsSelected(fileObject));
      }

      if (sizeLimitMb > 0) {
        const sizeInBytes = sizeLimitMb * 1024 * 1024;
        let hasError = false;

        fileObjects = fileObjects.map((fileObject) => {
          let modifiedFileObject = fileObject;

          if (initialFiles === files && initialFilesAreUploaded) {
            modifiedFileObject = markFileAsUploaded(modifiedFileObject);
          }

          const sizeLimitExceeded = fileObject.file.size > sizeInBytes;

          if (!hasError && sizeLimitExceeded) {
            modifiedFileObject = markFileAsFailed(fileObject, sizeLimitMb);
            hasError = true;
          }

          return modifiedFileObject;
        });

        if (hasError) {
          setDisabled(true);
        }
      }

      setFileQueue((prevFileQueue) => [...prevFileQueue, ...fileObjects]);

      setIsLoading(false);
    } catch (error) {
      throw new Error(`An error occurred while processing files: ${error}`);
    }
  };

  useEffect(() => {
    if (!initialFiles || initialFiles.length === 0) {
      setFileQueue([]);
      return;
    }

    parseFiles(initialFiles);
  }, [initialFiles]);

  const handleUploadFiles = async (freshFileQueue: typeof fileQueue) => {
    // check and validate files before the uploading
    const validatedItems: FileObject[] = freshFileQueue.filter(
      (fileObject) => !fileObject.isUploaded && !fileObject.hasError
    );

    const shouldUpload = validatedItems.length > 0;

    if (!shouldUpload) {
      return;
    }

    // starting uploading...
    setIsLoading(true);

    await uploadFiles(validatedItems);

    setIsLoading(false);
    setIsUploaded(true);

    if (clearFilesAfterUploading) {
      setFileQueue([]);
    } else {
      setFileQueue(freshFileQueue.map((fileObject) => markFileAsUploaded(fileObject)));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    parseFiles(acceptedFiles);
  }, []);

  const onRemove: FileUploaderOnRemove = (id) => {
    setFileQueue((files) => [...files.filter((f) => f.id !== id)]);
  };

  const onAttachmentCheck: FileUploaderonAttachmentCheck = (id, attachmentId) => {
    const currentFileObject = fileQueue.find((f) => f.id === id)!;
    const { selectedAttachments } = currentFileObject;
    const isAttachmentChecked = selectedAttachments.includes(attachmentId);
    const updatedSelectedAttachments = !isAttachmentChecked
      ? [...selectedAttachments, attachmentId]
      : selectedAttachments.filter((a) => a !== attachmentId);

    setFileQueue((prevFileQueue) =>
      prevFileQueue.map((prevFileObject) => {
        if (prevFileObject.id === id) {
          return {
            ...prevFileObject,
            selectedAttachments: updatedSelectedAttachments.sort(),
          };
        }
        return prevFileObject;
      })
    );
  };

  useEffect(() => {
    // do nothing when is uploaded and cleared
    if (isUploaded && clearFilesAfterUploading) {
      return;
    }

    // reset is uploaded status when all items are deleted, but not cleared
    if (isUploaded && !clearFilesAfterUploading && fileQueue.length === 0) {
      setIsUploaded(false);
      return;
    }

    // pass the files to the external state
    if (setFiles !== undefined) {
      setFiles(fileQueue);
    }

    // auto upload after the file queue is changed
    if (!isUploaded && autoUpload && fileQueue.length > 0) {
      handleUploadFiles(fileQueue);
    }
  }, [fileQueue, isUploaded]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const getBorderColour = () => {
    if (isDragActive || isUploaded) {
      return "green";
    }
    if (isLoading) {
      return "yellow";
    }
    return "lightgray";
  };

  const renderContentComponent = () => {
    const generateLoadingStatus = () => {
      if (isUploaded && clearFilesAfterUploading) {
        return <IsUploadedMessage />;
      }

      return isLoading ? <IsLoadingMessage /> : null;
    };

    const generateDragAndDropStatus = () => {
      if (isLoading || isUploaded) {
        return null;
      }

      return isDragActive ? <DropFileMessage /> : <DefaultMessage open={open} />;
    };

    return (
      <>
        <FileSummary files={fileQueue} onRemove={onRemove} onAttachmentCheck={onAttachmentCheck} />

        {generateLoadingStatus()}
        {generateDragAndDropStatus()}
      </>
    );
  };

  return (
    <Box
      sx={{ ...styles.root, borderColor: getBorderColour() }}
      id={`FileUploader-root`}
      className={size === "sm" ? SmallSizeClassName : ""}
    >
      <Box
        sx={{
          ...styles.dropArea.root,
          borderColor: getBorderColour(),
        }}
        id={`FileUploader-DropArea-root`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {renderContentComponent()}

        {fileQueue.length > 0 && !autoUpload && !hideButton && !isLoading ? (
          <Box sx={styles.uploadFilesButton}>
            <button onClick={() => handleUploadFiles(fileQueue)} disabled={disabled}>
              Upload files
            </button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default FileUploader;
