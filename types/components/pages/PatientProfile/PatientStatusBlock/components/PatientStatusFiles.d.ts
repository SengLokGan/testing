/// <reference types="react" />
import { PatientStatuses } from '@enums';
import type { FileDocument, WithSx } from '@types';
type PatientStatusFilesProps = WithSx<{
  title: string;
  patientId: string | number;
  status: PatientStatuses;
  files: FileDocument[];
}>;
export declare const PatientStatusFiles: ({
  patientId,
  title,
  status,
  files,
  sx,
}: PatientStatusFilesProps) => JSX.Element;
export {};
