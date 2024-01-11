import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
export type FormDocumentsUploadProps<T extends FieldValues> = {
  label?: string | ReactNode;
  subLabel?: string | ReactNode;
  required?: boolean;
  maxFileSize?: number;
  maxFileCount: number;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  linkUrl?: string;
  multiple?: boolean;
  uploadFileUrl?: string;
  infectedFileKeys: string[];
} & UseControllerProps<T>;
export declare const FormDocumentsUpload: <T extends FieldValues>({
  label,
  subLabel,
  maxFileSize,
  maxFileCount,
  setFileLoadingCount,
  linkUrl,
  multiple,
  uploadFileUrl,
  infectedFileKeys,
  ...props
}: FormDocumentsUploadProps<T>) => JSX.Element;
