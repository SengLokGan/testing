/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import { ClinicalNoteForm } from '@types';
type AddClinicalNoteFormViewProps = {
  control: Control<ClinicalNoteForm>;
};
export declare const AddClinicalNoteFormView: ({ control }: AddClinicalNoteFormViewProps) => JSX.Element;
export {};
