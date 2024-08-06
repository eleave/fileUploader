import { Box } from "@mui/system";

import styles from "../styles";

export interface DefaultMessageProps {
  open: () => void;
}

export const DefaultMessage = ({ open }: DefaultMessageProps) => (
  <Box sx={styles.box.root} id={`FileUploader-Box-DefaultMessage`}>
    {/* <UploadFileOutlinedIcon sx={styles.box.icon} /> */}
    <svg
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-m9simb"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="UploadIcon"
    >
      <path d="M5 20h14v-2H5zm0-10h4v6h6v-6h4l-7-7z"></path>
    </svg>

    <Box sx={styles.box.wrapper}>
      <Box sx={{ typography: "h2", ...styles.box.header }}>Drag files here to upload</Box>
      <Box sx={{ typography: "body1" }}>or click the browse button to select them</Box>
      <button onClick={open}>Browse</button>
    </Box>
  </Box>
);
