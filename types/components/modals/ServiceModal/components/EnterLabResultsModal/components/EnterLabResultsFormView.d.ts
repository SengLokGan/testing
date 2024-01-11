import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormRegister } from 'react-hook-form/dist/types/form';
import { LabResultFieldsResponse, ManualEnterLabResultForm } from '@types';
type EnterLabResultsFormViewProps = {
  control: Control<ManualEnterLabResultForm>;
  register: UseFormRegister<ManualEnterLabResultForm>;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
  dynamicTextFields: any[];
  dynamicCheckboxFields: any[];
  dynamicFieldsData: LabResultFieldsResponse[];
  isFileLink: boolean;
};
export declare const EnterLabResultsFormView: ({
  control,
  register,
  setFileLoadingCount,
  dynamicTextFields,
  dynamicCheckboxFields,
  dynamicFieldsData,
  isFileLink,
}: EnterLabResultsFormViewProps) => JSX.Element;
export {};
