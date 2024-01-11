/// <reference types="react" />
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { Option, PreHDForm } from '@types';
type DialysisPreHdStepDialyzerGroupProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  setValue: UseFormSetValue<PreHDForm>;
  nursesOptions: Option[];
};
declare const DialysisPreHdStepDialyzerGroup: ({
  control,
  watch,
  setValue,
  nursesOptions,
}: DialysisPreHdStepDialyzerGroupProps) => JSX.Element;
export default DialysisPreHdStepDialyzerGroup;
