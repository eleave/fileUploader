import { generateFileId } from '../utility';
import { MSGMetaDataSchema } from './msg/types';
import { EMLMetaDataSchema } from './eml/types';

export type MetaDataSchema = MSGMetaDataSchema | EMLMetaDataSchema;

export class FileObject {
  id!: number;

  file!: File;

  metaData!: MetaDataSchema;

  type!: String;

  contentType!: string;

  selectedAttachments!: number[];

  getAttachment!: (attach: number) => {
    fileName: string;
    content: Uint8Array;
  } | null;

  isUploaded!: boolean;

  sizeLimitMb!: number;

  hasError!: boolean;
}

export type GenerateObjectFile = (
  data: string | ArrayBuffer | null,
  file: File,
  resolve: (value: FileObject) => void,
) => void;

export const generateAnyFileObject: GenerateObjectFile = (_, file, resolve) => {
  const fileObject = new FileObject();
  fileObject.id = generateFileId();
  fileObject.file = file;

  resolve(fileObject);
};
