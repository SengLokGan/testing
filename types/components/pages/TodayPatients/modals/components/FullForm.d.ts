import { MainInformationProps } from './MainInformation';
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PatientStatuses } from '@enums';
import { RegisterPatientForm } from '@types';
import { Dispatch, SetStateAction } from 'react';
type FullFormProps = {
  control: Control<RegisterPatientForm>;
  watch: UseFormWatch<RegisterPatientForm>;
  patientStatus: PatientStatuses;
  register: UseFormRegister<RegisterPatientForm>;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
} & Pick<MainInformationProps, 'currentPhoto' | 'setCurrentPhoto'>;
export declare const FullForm: ({
  control,
  watch,
  patientStatus,
  register,
  setFileLoadingCount,
  ...restProps
}: FullFormProps) => JSX.Element;
export {};
