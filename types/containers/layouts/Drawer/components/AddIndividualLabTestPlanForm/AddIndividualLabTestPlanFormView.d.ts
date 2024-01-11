/// <reference types="react" />
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { CreateIndividualLabTestPlanFormRaw } from '@types';
type AddIndividualLabTestPlanFormViewProps = {
  control: Control<CreateIndividualLabTestPlanFormRaw>;
  watch: UseFormWatch<CreateIndividualLabTestPlanFormRaw>;
  setValue: UseFormSetValue<CreateIndividualLabTestPlanFormRaw>;
  register: UseFormRegister<CreateIndividualLabTestPlanFormRaw>;
  isDirty?: boolean;
};
export declare const AddIndividualLabTestPlanFormView: ({
  control,
  watch,
  setValue,
  register,
}: AddIndividualLabTestPlanFormViewProps) => JSX.Element;
export {};
