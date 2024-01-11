/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import { PostHDForm } from '@types';
import { UseFormWatch } from 'react-hook-form';
type DialysisPostHdBleedingStatusProps = {
  control: Control<PostHDForm>;
  watch: UseFormWatch<PostHDForm>;
};
export declare const DialysisPostHdBleedingStatus: ({
  control,
  watch,
}: DialysisPostHdBleedingStatusProps) => JSX.Element;
export {};
