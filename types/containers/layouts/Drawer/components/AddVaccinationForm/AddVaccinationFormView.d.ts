import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { VaccinationForm } from '@types';
type AddVaccinationFormViewProps = {
  control: Control<VaccinationForm>;
  watch: UseFormWatch<VaccinationForm>;
  trigger: UseFormTrigger<VaccinationForm>;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  specialities: [];
  isExternalDoctor: boolean;
};
export declare const AddVaccinationFormView: ({
  control,
  watch,
  trigger,
  setFileLoadingCount,
  specialities,
  isExternalDoctor,
}: AddVaccinationFormViewProps) => JSX.Element;
export {};
