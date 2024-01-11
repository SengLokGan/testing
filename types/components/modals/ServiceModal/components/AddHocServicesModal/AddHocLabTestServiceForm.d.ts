/// <reference types="react" />
import type { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import type { AddHocEventFormType } from '@types';
type AddHocLabTestServiceFormProps = {
  control: Control<AddHocEventFormType>;
  setValue: UseFormSetValue<AddHocEventFormType>;
  watch: UseFormWatch<AddHocEventFormType>;
};
export declare const AddHocLabTestServiceForm: ({
  control,
  setValue,
  watch,
}: AddHocLabTestServiceFormProps) => JSX.Element;
export {};
