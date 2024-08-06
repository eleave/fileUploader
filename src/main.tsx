import React from "react";
import ReactDOM from "react-dom/client";
import FileUploader from "./index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FileUploader
      uploadFiles={async (fileQueue) => {
        console.log("Uploading files", fileQueue);
        return true;
      }}
    />
  </React.StrictMode>
);
