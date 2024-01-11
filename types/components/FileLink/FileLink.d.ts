/// <reference types="react" />
import type { FileDocument, WithSx } from '@types';
type FileLinkWithSizeProps = WithSx<{
  patientId?: string;
  file: FileDocument;
  withSize?: boolean;
  withIcon?: boolean;
  queryParams?: string;
  removeLink?: boolean;
}>;
export declare const FileLink: ({
  file,
  patientId,
  withSize,
  queryParams,
  removeLink,
  withIcon,
  sx,
}: FileLinkWithSizeProps) => JSX.Element;
export {};
