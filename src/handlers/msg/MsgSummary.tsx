import { useState } from "react";
import { Box } from "@mui/system";

import { formatUserNameAndEmailText } from "../../utility";
import { FileObject } from "../fileObject";
import { FileUploaderonAttachmentCheck } from "../../types";
import { SummaryItem } from "../SummaryItem";
import { MSGMetaDataSchema } from "./types";
import styles from "../../styles";

interface MsgSummaryProps {
  fileId: FileObject["id"];
  metaData: MSGMetaDataSchema;
  selectedAttachments: FileObject["selectedAttachments"];
  onAttachmentCheck: FileUploaderonAttachmentCheck;
}

const MsgSummary = ({
  fileId,
  metaData,
  selectedAttachments,
  onAttachmentCheck,
}: MsgSummaryProps) => {
  const [showAttachments, setShowAttachments] = useState(false);
  const hasAttachments = metaData.attachments && metaData.attachments.length > 0;

  return (
    <Box sx={{ width: "100%" }}>
      <SummaryItem name="Subject" value={metaData.subject} />
      <SummaryItem
        name="From"
        value={formatUserNameAndEmailText(metaData.senderName, metaData.senderEmail)}
      />
      <SummaryItem
        name="To"
        value={metaData.recipients
          .map((recipient) => formatUserNameAndEmailText(recipient.name, recipient.email))
          .join(", ")}
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
              <Box sx={{ typography: "body2" }} flex={1}>
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

export default MsgSummary;
