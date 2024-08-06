export interface EMLAttachmentSchema {
  contentType: string;
  data: Uint8Array;
  data64: string;
  inline: boolean;
  name: string;
}

export interface EMLRecipientsSchema {
  email: string;
  name: string;
}

export interface EMLMetaDataSchema {
  attachments: EMLAttachmentSchema[];
  date: Date;
  from: EMLRecipientsSchema;
  to: EMLRecipientsSchema;
  headers: Record<string, string | string[]>;
  html: string;
  htmlheaders: Record<string, string>;
  multipartAlternative: Record<string, string>;
  subject: string;
}
