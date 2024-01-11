import { Dispatch, SetStateAction } from 'react';
type DocumentUploadProps = {
  control: any;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
};
export declare const DocumentUpload: ({ control, setFileLoadingCount }: DocumentUploadProps) => JSX.Element;
export {};
