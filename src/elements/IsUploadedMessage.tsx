import React from "react";
import { Box, SxProps } from "@mui/system";

import styles from "../styles";

export type IsUploadedMessageProps = {
  sx?: SxProps;
};

export const IsUploadedMessage: React.FC<IsUploadedMessageProps> = ({ sx }) => (
  <Box sx={{ ...styles.box.root, ...sx } as SxProps} id={`FileUploader-Box-IsUploadedMessage`}>
    <Box sx={{ ...styles.box.wrapper, flexDirection: "row" }}>
      <Box sx={{ typography: "h2", ...styles.box.header }}>✅ The files have been uploaded!</Box>
    </Box>
  </Box>
);
