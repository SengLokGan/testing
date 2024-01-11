/// <reference types="react" />
import { Control, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PreHDForm } from '@types';
type PreHdAccessManagementProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  trigger: UseFormTrigger<PreHDForm>;
};
declare const DialysisPreHdStepInitialInfoGroup: ({
  control,
  watch,
  trigger,
}: PreHdAccessManagementProps) => JSX.Element;
export default DialysisPreHdStepInitialInfoGroup;
