import { useState } from "react";
import { Box } from "@mui/system";

import { formatUserNameAndEmailText } from "../../utility";
import { FileObject } from "../fileObject";
import { FileUploaderonAttachmentCheck } from "../../types";
import { SummaryItem } from "../SummaryItem";
import { EMLMetaDataSchema } from "./types";
import styles from "../../styles";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface EmlSummaryProps {
  fileId: FileObject["id"];
  metaData: EMLMetaDataSchema;
  selectedAttachments: FileObject["selectedAttachments"];
  onAttachmentCheck: FileUploaderonAttachmentCheck;
}

const EmlSummary = ({
  fileId,
  metaData,
  selectedAttachments,
  onAttachmentCheck,
}: EmlSummaryProps) => {
  const [showAttachments, setShowAttachments] = useState(false);
  const hasAttachments = metaData.attachments && metaData.attachments.length > 0;

  return (
    <Box sx={{ width: "100%" }}>
      <SummaryItem name="Subject" value={metaData.subject} />
      <SummaryItem
        name="From"
        value={formatUserNameAndEmailText(metaData.from.name, metaData.from.email)}
      />
      <SummaryItem
        name="To"
        value={formatUserNameAndEmailText(metaData.to.name, metaData.to.email)}
      />
      <Box sx={styles.attachments.header}>
        <Box sx={{ typography: "body2" }} fontWeight="600">
          {hasAttachments ? "Attachments" : "No attachments available for this file"}
        </Box>
        {hasAttachments && (
          <button onClick={() => setShowAttachments(!showAttachments)}>
            {!showAttachments ? "Expand" : "Collapse"}
          </button>
        )}
      </Box>
      {showAttachments && hasAttachments && (
        <Box sx={styles.attachments}>
          {metaData.attachments.map((a, i) => (
            <Box key={a.name + i}>
              <Box component="span" sx={{ typography: "body2" }} flex={1}>
                {a.name}
              </Box>
              <input
                type="checkbox"
                checked={selectedAttachments.includes(i)}
                onChange={() => onAttachmentCheck(fileId, i)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EmlSummary;
