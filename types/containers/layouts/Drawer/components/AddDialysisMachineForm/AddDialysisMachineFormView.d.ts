/// <reference types="react" />
import type { Control, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import type { DialysisMachineForm, IsolationGroup } from '@types';
type AddDialysisMachineFormViewProps = {
  control: Control<DialysisMachineForm>;
  watch: UseFormWatch<DialysisMachineForm>;
  trigger: UseFormTrigger<DialysisMachineForm>;
  isDirty: boolean;
  isolationGroupOptions: {
    label: string;
    value: string;
  }[];
  isolationGroups: IsolationGroup[];
  locationOptions: {
    label: string;
    value: number;
  }[];
  dataIsLoading: boolean;
};
export declare const AddDialysisMachineFormView: ({
  control,
  watch,
  trigger,
  isDirty,
  locationOptions,
  isolationGroups,
  isolationGroupOptions,
  dataIsLoading,
}: AddDialysisMachineFormViewProps) => JSX.Element;
export {};
