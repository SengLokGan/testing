/// <reference types="react" />
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PatientStatuses } from '@enums';
import { RegisterPatientForm } from '@types';
type WalkInFormProps = {
  control: Control<RegisterPatientForm>;
  watch: UseFormWatch<RegisterPatientForm>;
  patientStatus: PatientStatuses;
  register: UseFormRegister<RegisterPatientForm>;
};
export declare const WalkInForm: ({ control, watch, patientStatus, register }: WalkInFormProps) => JSX.Element;
export {};
