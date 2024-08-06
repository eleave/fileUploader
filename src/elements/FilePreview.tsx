import { Box } from "@mui/system";

import { downloadFile, formatBytes, getFileMaxLimitExceededMessage } from "../utility";
import { FileObject } from "../handlers/fileObject";
import { FileUploaderOnRemove, FileUploaderonAttachmentCheck } from "../types";
import { SummaryItem } from "../handlers/SummaryItem";
import { MetaInfo } from "./MetaInfo";
import styles from "../styles";

export interface FilePreviewProps {
  supported?: boolean;
  fileObject: FileObject;
  onRemove: FileUploaderOnRemove;
  onAttachmentCheck: FileUploaderonAttachmentCheck;
}

export const FilePreview = ({
  supported,
  fileObject,
  onRemove,
  onAttachmentCheck,
}: FilePreviewProps) => (
  <Box
    sx={{
      ...styles.filePreview.root,
      ...(fileObject.isUploaded ? styles.box.borderSuccess : null),
      ...(fileObject.hasError ? styles.box.borderError : null),
    }}
    id={`FileUploader-FilePreview-root`}
  >
    <Box sx={styles.filePreview.wrapper}>
      <Box>
        {fileObject.isUploaded && `✔️`}
        {fileObject.hasError && `✖️`}
        <Box
          component="span"
          onClick={() => downloadFile(fileObject.file)}
          sx={{
            typography: "h5",
            ...styles.filePreview.filename,
          }}
        >
          {fileObject.file.name}
        </Box>
      </Box>
      {supported ? null : "File Type not supported"}
      <Box sx={styles.filePreview.details}>
        <Box>
          {fileObject.hasError && (
            <SummaryItem
              sx={{ color: (theme) => theme.palette.error.main }}
              name="Error"
              value={getFileMaxLimitExceededMessage(fileObject.sizeLimitMb)}
            />
          )}
          <SummaryItem name="Type" value={fileObject.file.type} />
          <SummaryItem name="Size" value={formatBytes(fileObject.file.size)} />
        </Box>
        <Box>
          <MetaInfo
            file={fileObject}
            selectedAttachments={fileObject.selectedAttachments}
            onAttachmentCheck={onAttachmentCheck}
          />
        </Box>
      </Box>
    </Box>
    <Box sx={styles.filePreview.closeButton}>
      <button onClick={() => onRemove(fileObject.id)}>✖️</button>
    </Box>
  </Box>
);
