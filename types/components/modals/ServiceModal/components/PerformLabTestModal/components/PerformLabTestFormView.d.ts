/// <reference types="react" />
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import type { PerformLabTestForm } from '@types';
import { AutocompleteFreeSoloOptionType } from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';
type PerformLabTestFormViewProps = {
  control: Control<PerformLabTestForm>;
  setValue: UseFormSetValue<PerformLabTestForm>;
  watch: UseFormWatch<PerformLabTestForm>;
  nursesOptions: {
    label: string;
    value: string;
  }[];
  isDirty?: boolean;
  procedureOptions: AutocompleteFreeSoloOptionType[];
};
export declare const PerformLabTestFormView: ({
  control,
  watch,
  setValue,
  isDirty,
  procedureOptions,
  nursesOptions,
}: PerformLabTestFormViewProps) => JSX.Element;
export {};
