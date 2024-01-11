/// <reference types="react" />
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import { ClinicalEventFormType } from '@types';
type AddClinicalEventFormProps = {
  control: Control<ClinicalEventFormType>;
  watch: UseFormWatch<ClinicalEventFormType>;
  editedEventId?: string;
};
export declare const AddClinicalEventForm: ({
  control,
  watch,
  editedEventId,
}: AddClinicalEventFormProps) => JSX.Element;
export {};
