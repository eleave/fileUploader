import Box from "@mui/system/Box";

import { FileObject } from "../handlers/fileObject";
import { FileUploaderOnRemove, FileUploaderonAttachmentCheck } from "../types";
import { FilePreview } from "./FilePreview";
import styles from "../styles";

export interface FileSummaryProps {
  files: FileObject[];
  onRemove: FileUploaderOnRemove;
  onAttachmentCheck: FileUploaderonAttachmentCheck;
}

export const FileSummary = ({ files, onRemove, onAttachmentCheck }: FileSummaryProps) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.fileSummary.root} id={`FileUploader-FileSummary-root`}>
      {files.map((fileObject) => (
        <FilePreview
          supported
          fileObject={fileObject}
          onRemove={onRemove}
          onAttachmentCheck={onAttachmentCheck}
          key={fileObject.id}
        />
      ))}
    </Box>
  );
};
