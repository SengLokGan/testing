/// <reference types="react" />
import { Control, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { AddHocEventFormType } from '@types';
import { AddServiceModalPlace } from '@enums/components/AddServiceModalPlace';
type AddHocHdServiceFormProps = {
  isolationGroupId?: string;
  control: Control<AddHocEventFormType>;
  watch: UseFormWatch<AddHocEventFormType>;
  setValue: UseFormSetValue<AddHocEventFormType>;
  place: AddServiceModalPlace;
  trigger: UseFormTrigger<AddHocEventFormType>;
};
export declare const AddHocHdServiceForm: ({
  isolationGroupId,
  control,
  watch,
  setValue,
  place,
  trigger,
}: AddHocHdServiceFormProps) => JSX.Element;
export {};
