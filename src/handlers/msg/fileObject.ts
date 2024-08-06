// import MessageReader from '@kenjiuno/msgreader';

import { generateFileId } from "../../utility";
import { FileObject, GenerateObjectFile } from "../fileObject";
// import { MSGMetaDataSchema } from './types';

const generateMsgFileObject: GenerateObjectFile = (data, file, resolve) => {
  const fileObject = new FileObject();
  fileObject.id = generateFileId();
  fileObject.file = file;

  // const msgreader = new MessageReader(data as ArrayBuffer);
  // const email = msgreader.getFileData();

  // fileObject.metaData = { ...email } as MSGMetaDataSchema;
  fileObject.type = "msg";
  fileObject.contentType = "EMAIL";
  fileObject.selectedAttachments = [];
  // fileObject.getAttachment = msgreader.getAttachment.bind(msgreader);
  fileObject.isUploaded = false;

  resolve(fileObject);
};

export default generateMsgFileObject;
