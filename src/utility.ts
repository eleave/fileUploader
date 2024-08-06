import {
  Handler,
  invokeReader,
  doesHandlerExist,
  getHandlerByExtension,
} from './registry';
import { generateAnyFileObject, FileObject } from './handlers/fileObject';

export function processFile(file: File) {
  return new Promise<FileObject>((resolve, reject) => {
    const reader = new FileReader();
    const ext = getExtension(file.name);
    let handler: Handler | null = null;

    if (doesHandlerExist(ext)) {
      handler = getHandlerByExtension(ext);
    }

    reader.onabort = () => reject(new Error('File reading was aborted'));
    reader.onerror = () => reject(new Error('File reading has failed'));
    reader.onload = () => {
      const binaryStr = reader.result;
      if (handler) {
        handler.fileObjectGenerator(binaryStr, file, resolve);
      } else {
        generateAnyFileObject(binaryStr, file, resolve);
      }
    };

    invokeReader(file, handler, reader);
  });
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function getExtension(filename: string) {
  const ext = filename.split('.').pop()!;
  return ext;
}

export function formatUserNameAndEmailText(name: string, email: string) {
  let formattedName = name;

  if (!formattedName) {
    formattedName = email
      .split('@')[0]
      .split('.')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return `${formattedName} <${email}>`;
}

export const generateFileId = (() => {
  let counter = 0;
  return () => ++counter;
})();

export async function getFileByUrl(path: string, filename = 'filename.ext') {
  const response = await fetch(path);
  const blob = await response.blob();

  return new File([blob], filename, { type: blob.type });
}

export const markFileAsUploaded = (fileObject: FileObject) => ({
  ...fileObject,
  isUploaded: true,
});

export const markFileAsFailed = (
  fileObject: FileObject,
  sizeLimitMb: number,
) => ({
  ...fileObject,
  hasError: true,
  sizeLimitMb,
});

export const getFileMaxLimitExceededMessage = (sizeLimitMb: number) =>
  `Files larger than ${sizeLimitMb} MB cannot be uploaded.`;

export const markAllAttachmentsAsSelected = (fileObject: FileObject) => {
  if (!fileObject.metaData || !fileObject.metaData.attachments) {
    return fileObject;
  }

  const { attachments } = fileObject.metaData;
  const selectedAttachments = attachments.map((_, i) => i);

  return { ...fileObject, selectedAttachments };
};

export const downloadFile = (file: File | Blob, filename = '') => {
  const url = window.URL.createObjectURL(file);

  const a = document.createElement('a');
  a.href = url;
  a.download = ('name' in file && file.name) || filename;
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
