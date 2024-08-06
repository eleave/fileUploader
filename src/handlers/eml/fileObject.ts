import { readEml } from 'eml-parse-js';

import { generateFileId } from '../../utility';
import { FileObject, GenerateObjectFile } from '../fileObject';
import { EMLMetaDataSchema } from './types';

const generateEmlFileObject: GenerateObjectFile = (data, file, resolve) => {
  const fileObject = new FileObject();
  fileObject.id = generateFileId();
  fileObject.file = file;

  if (data == null) {
    throw new Error(
      'Cannot generate an EML file object because the file data is null',
    );
  }

  readEml(data.toString(), (err, ReadEmlJson) => {
    fileObject.metaData = ReadEmlJson as EMLMetaDataSchema;
    fileObject.type = 'eml';
    fileObject.contentType = 'EMAIL';
    fileObject.selectedAttachments = [];
    fileObject.getAttachment = (attach) =>
      ReadEmlJson?.attachments
        ? {
            fileName: ReadEmlJson.attachments[attach].name,
            content: ReadEmlJson.attachments[attach].data as Uint8Array,
          }
        : null;
    fileObject.isUploaded = false;

    resolve(fileObject);
  });
};

export default generateEmlFileObject;
