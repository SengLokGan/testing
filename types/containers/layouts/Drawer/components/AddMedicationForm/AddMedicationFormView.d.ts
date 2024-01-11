/// <reference types="react" />
import type { MedicationForm } from '@types';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form/dist/types/form';
type AddMedicationFormViewProps = {
  control: Control<MedicationForm>;
  setValue: UseFormSetValue<MedicationForm>;
  watch: UseFormWatch<MedicationForm>;
  register: UseFormRegister<MedicationForm>;
  trigger: UseFormTrigger<MedicationForm>;
  doctorSpecialities: [];
  isExternalDoctor: boolean;
};
export declare const AddMedicationFormView: ({
  control,
  watch,
  trigger,
  doctorSpecialities,
  isExternalDoctor,
  register,
  setValue,
}: AddMedicationFormViewProps) => JSX.Element;
export {};
