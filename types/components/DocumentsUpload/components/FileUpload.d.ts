import { Dispatch, SetStateAction } from 'react';
import { FileWithId, FormFile, TemporaryFileResponse } from '@types';
type FileUploadProps = {
  file: FileWithId | FormFile;
  onSave: (file: FileWithId, uploadedFile: TemporaryFileResponse) => void;
  onDelete: (fileId: string | number) => void;
  maxFileSize?: number;
  maxCountError?: string;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  linkUrl?: string;
  uploadFileUrl?: string;
  infectedFileKeys: string[];
};
export declare const FileUpload: ({
  file,
  onDelete,
  onSave,
  maxFileSize,
  maxCountError,
  setFileLoadingCount,
  linkUrl,
  uploadFileUrl,
  infectedFileKeys,
}: FileUploadProps) => JSX.Element;
export {};
