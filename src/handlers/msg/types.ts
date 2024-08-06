export interface MSGAttachmentSchema {
  attachMimeTag: string;
  attachmentHidden: boolean;
  contentLength: number;
  creationTime: string;
  dataId: number;
  dataType: string;
  extension: string;
  fileName: string;
  fileNameShort: string;
  lastModificationTime: string;
  name: string;
  pidContentId: string;
}

export interface MSGRecipientsSchema {
  addressType: string;
  dataType: string;
  email: string;
  name: string;
  recipType: string;
}

export interface MSGMetaDataSchema {
  attachments: MSGAttachmentSchema[];
  body: string;
  clientSubmitTime: string;
  conversationTopic: string;
  creationTime: string;
  dataType: string;
  headers: string;
  html: Uint8Array;
  internetCodepage: number;
  lastModificationTime: string;
  messageClass: string;
  messageFlags: number;
  normalizedSubject: string;
  recipients: MSGRecipientsSchema[];
  senderAddressType: string;
  senderEmail: string;
  senderName: string;
  subject: string;
}
