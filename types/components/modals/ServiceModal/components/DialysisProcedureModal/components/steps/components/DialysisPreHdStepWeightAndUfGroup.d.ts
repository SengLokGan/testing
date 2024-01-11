/// <reference types="react" />
import { Control, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PreHDForm } from '@types';
type DialysisPreHdWeightAndUfGroupProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  setValue: UseFormSetValue<PreHDForm>;
  trigger: UseFormTrigger<PreHDForm>;
};
declare const DialysisPreHdWeightAndUfGroup: ({
  control,
  watch,
  setValue,
  trigger,
}: DialysisPreHdWeightAndUfGroupProps) => JSX.Element;
export default DialysisPreHdWeightAndUfGroup;
