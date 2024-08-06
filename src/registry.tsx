import React from 'react';

import { GenerateObjectFile } from './handlers/fileObject';
import EmlSummary from './handlers/eml/EmlSummary';
import generateEmlFileObject from './handlers/eml/fileObject';
import MsgSummary from './handlers/msg/MsgSummary';
import generateMsgFileObject from './handlers/msg/fileObject';

export interface Handler {
  type: string;
  extensions: string[];
  summary: (props: unknown[]) => React.ReactNode;
  fileObjectGenerator: GenerateObjectFile;
  dataType: string;
  mimeType: string;
}

export const registry = {
  handlers: [
    {
      type: 'eml',
      extensions: ['eml'],
      summary: (props: any) => <EmlSummary {...props} />,
      fileObjectGenerator: generateEmlFileObject,
      dataType: 'Text',
      mimeType: 'message/rfc822',
    },
    {
      type: 'msg',
      extensions: ['msg'],
      summary: (props: any) => <MsgSummary {...props} />,
      fileObjectGenerator: generateMsgFileObject,
      dataType: 'ArrayBufffer',
      mimeType: 'application/vnd.ms-outlook',
    },
  ] as Handler[],
};

export function invokeReader(
  file: File,
  handler: Handler | null,
  reader: FileReader,
) {
  const { dataType } = handler ?? {};

  switch (dataType) {
    case 'Text':
      reader.readAsText(file);
      break;
    case 'ArrayBuffer':
      reader.readAsArrayBuffer(file);
      break;
    case 'DataURL':
      reader.readAsDataURL(file);
      break;
    default:
      if (file.type.startsWith('text')) {
        reader.readAsText(file);
      } else if (file.type.startsWith('image')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
  }
}

export function doesHandlerExist(extension: string) {
  return registry.handlers.find((h) => h.extensions.includes(extension));
}

export function getHandlerByExtension(extension: string) {
  const handlers = registry.handlers.filter((h) =>
    h.extensions.includes(extension),
  );

  if (handlers.length === 0) {
    throw new Error(
      `Error: no handler registered for the extension ${extension}`,
    );
  }

  if (handlers.length > 1) {
    throw new Error(
      'Error: more than one handler configured for the same extension',
    );
  }

  return handlers[0];
}

export function getSupportedFileTypes() {
  return registry.handlers.map((h) => h.type);
}
