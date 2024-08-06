export const SmallSizeClassName = `FileUploader-size-sm`;
export const SmallVersion = `.${SmallSizeClassName} &`;
export const IconDefaultFontSize = 60;
export const IconSmallFontSize = 32;

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 220,
    gap: 2,
    px: 2,
    border: `2px dashed gray`,
    [`&.${SmallSizeClassName}`]: {
      borderWidth: "1px",
    },
    "> *": {
      width: "100%",
      height: "100%",
      flex: 1,
    },
  },
  fileProgress: {
    root: { p: 1, mb: 4, border: `0.125rem dashed transparent` },
    header: { color: "#5c5377", mb: 1 },
    tree: { display: "flex", flexDirection: "row", p: 1 },
  },
  dropArea: {
    root: {
      color: "green",
      display: "flex",
      flexDirection: "column",
      p: 2,
    },
  },
  uploadFilesButton: { textAlign: "center" },
  box: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      m: "auto",
      gap: 1,
      minHeight: 200,
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
    },
    icon: {
      fontSize: IconDefaultFontSize,
      [SmallVersion]: {
        fontSize: IconSmallFontSize,
      },
    },
    header: {
      [SmallVersion]: "",
    },
    borderSuccess: {
      border: `1px solid green`,
    },
    borderError: {
      border: `1px solid red`,
    },
  },
  fileSummary: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
  },
  filePreview: {
    root: {
      display: "flex",
      flexDirection: "row",
      border: `1px solid gray`,
      borderRadius: 1,
      p: 2,
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: "100%",
    },
    filename: {
      overflowWrap: "anywhere",
      cursor: "pointer",
      [`&:hover`]: { textDecoration: "underline" },
    },
    details: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      "> *": {
        flex: 1,
        minWidth: "280px",
      },
    },
    closeButton: { mb: "auto", mr: 0, width: "auto" },
  },
  attachments: {
    header: {
      pt: 2,
      display: "flex",
      gap: 2,
      alignItems: "center",
    },
    "> *": {
      display: "flex",
      flexDirection: "row",
      gap: 1,
      alignItems: "center",
    },
  },
};

export default styles;
