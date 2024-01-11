import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { DocumentsUpload } from '@components/DocumentsUpload';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

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

export const FormDocumentsUpload = <T extends FieldValues>({
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
}: FormDocumentsUploadProps<T>) => {
  return (
    <Controller
      {...props}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <DocumentsUpload
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          subLabel={subLabel}
          maxFileSize={maxFileSize}
          error={error}
          name={name}
          value={value}
          maxFileCount={maxFileCount}
          setFileLoadingCount={setFileLoadingCount}
          fieldRef={ref}
          linkUrl={linkUrl}
          multiple={multiple}
          uploadFileUrl={uploadFileUrl}
          infectedFileKeys={infectedFileKeys}
        />
      )}
    />
  );
};
