import { Box } from "@mui/system";

import styles from "../styles";

export const DropFileMessage = () => (
  <Box sx={styles.box.root} id={`FileUploader-Box-DropFileMessage`}>
    <Box sx={styles.box.wrapper}>
      <Box sx={{ typography: "h2", ...styles.box.header }}>Release to drop files</Box>
    </Box>
  </Box>
);
