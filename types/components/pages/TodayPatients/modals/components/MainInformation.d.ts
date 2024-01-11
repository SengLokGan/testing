/// <reference types="react" />
import { PatientStatuses } from '@enums';
import { UploadPhotoModalProps } from '@components/pages/PatientProfile';
import { MainInfoForm } from '@types';
export type MainInformationProps = {
  control: any;
  watch: any;
  register: any;
  patientStatus: PatientStatuses;
  currentPhoto?: string | null;
  defaultValues?: MainInfoForm;
} & Partial<Pick<UploadPhotoModalProps, 'setCurrentPhoto'>>;
export declare const OTHERS = 'other';
export declare const MainInformation: ({
  control,
  watch,
  register,
  currentPhoto,
  setCurrentPhoto,
  patientStatus,
  defaultValues,
}: MainInformationProps) => JSX.Element;
