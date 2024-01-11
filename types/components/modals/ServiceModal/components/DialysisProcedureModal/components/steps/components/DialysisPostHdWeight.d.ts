/// <reference types="react" />
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PostHDForm } from '@types';
type DialysisPostHdWeightProps = {
  control: Control<PostHDForm>;
  preSessionWeight?: string;
  watch: UseFormWatch<PostHDForm>;
  setValue: UseFormSetValue<PostHDForm>;
  parseWeightLossResult: (preWeight: number, postWeight: number) => string;
};
export declare const DialysisPostHdWeight: ({
  control,
  watch,
  preSessionWeight,
  setValue,
  parseWeightLossResult,
}: DialysisPostHdWeightProps) => JSX.Element;
export {};
