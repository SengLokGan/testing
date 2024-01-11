/// <reference types="react" />
import { ClientOverviewPatient } from '@types';
type PatientCardProps = {
  patient: ClientOverviewPatient;
};
export declare const PatientCard: ({
  patient: { name, document, gender, isolation, access, treatments, hdSchedule },
}: PatientCardProps) => JSX.Element;
export {};
