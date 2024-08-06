import React from "react";
import { Box, SxProps } from "@mui/system";

import styles from "../styles";

export type IsLoadingMessageProps = {
  sx?: SxProps;
};

export const IsLoadingMessage: React.FC<IsLoadingMessageProps> = ({ sx }) => (
  <Box sx={{ ...styles.box.root, ...sx } as SxProps} id={`FileUploader-Box-IsLoadingMessage`}>
    <Box sx={{ ...styles.box.wrapper, flexDirection: "row" }}>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-m9simb"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="HourglassTopIcon"
      >
        <path d="m6 2 .01 6L10 12l-3.99 4.01L6 22h12v-6l-4-4 4-3.99V2zm10 14.5V20H8v-3.5l4-4z"></path>
      </svg>
      <Box sx={{ typography: "h2", ...styles.box.header }}>Please wait for a while...</Box>
    </Box>
  </Box>
);
