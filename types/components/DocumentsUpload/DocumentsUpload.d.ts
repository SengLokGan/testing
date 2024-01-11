import { Dispatch, ReactNode, Ref, SetStateAction } from 'react';
import { FormFile } from '@types';
import { FieldError } from 'react-hook-form/dist/types';
type DocumentsUploadProps = {
  maxFileSize?: number;
  maxFileCount: number;
  onChange: (files: FormFile[]) => void;
  onBlur: () => void;
  label?: string | ReactNode;
  subLabel?: string | ReactNode;
  error?: FieldError;
  name: string;
  value: FormFile[];
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  fieldRef?: Ref<HTMLLabelElement>;
  linkUrl?: string;
  multiple?: boolean;
  uploadFileUrl?: string;
  infectedFileKeys: string[];
};
export declare const DocumentsUpload: ({
  maxFileSize,
  maxFileCount,
  label,
  subLabel,
  error,
  onChange,
  onBlur,
  name,
  value,
  setFileLoadingCount,
  fieldRef,
  linkUrl,
  uploadFileUrl,
  multiple,
  infectedFileKeys,
}: DocumentsUploadProps) => JSX.Element;
export {};
