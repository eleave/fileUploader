import { FileUploaderonAttachmentCheck } from '../types';
import { FileObject } from '../handlers/fileObject';
import EmlSummary from '../handlers/eml/EmlSummary';
import MsgSummary from '../handlers/msg/MsgSummary';
import { EMLMetaDataSchema } from '../handlers/eml/types';
import { MSGMetaDataSchema } from '../handlers/msg/types';

export interface MetaInfoProps {
  file: FileObject;
  selectedAttachments: FileObject['selectedAttachments'];
  onAttachmentCheck: FileUploaderonAttachmentCheck;
}

export const MetaInfo = ({
  file,
  selectedAttachments,
  onAttachmentCheck,
}: MetaInfoProps) => {
  if (file.type === 'eml') {
    return (
      <EmlSummary
        fileId={file.id}
        metaData={file.metaData as EMLMetaDataSchema}
        selectedAttachments={selectedAttachments}
        onAttachmentCheck={onAttachmentCheck}
      />
    );
  }

  if (file.type === 'msg') {
    return (
      <MsgSummary
        fileId={file.id}
        metaData={file.metaData as MSGMetaDataSchema}
        selectedAttachments={selectedAttachments}
        onAttachmentCheck={onAttachmentCheck}
      />
    );
  }

  return null;
};
