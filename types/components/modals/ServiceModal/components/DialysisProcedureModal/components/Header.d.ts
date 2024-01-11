/// <reference types="react" />
import { DialysisStatus } from '@enums';
import { DialysisPatient } from '@types';
type Status = {
  activeStep: DialysisStatus;
  currentStep: DialysisStatus;
};
type HeaderProps = {
  patient: DialysisPatient;
  status: Status;
};
export declare const Header: ({ patient, status }: HeaderProps) => JSX.Element;
export {};
