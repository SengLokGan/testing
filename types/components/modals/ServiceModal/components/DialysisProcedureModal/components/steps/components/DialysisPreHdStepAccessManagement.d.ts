/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import type { PreHDForm, CvcAccessManagementResponse, VascularAccessManagementResponse } from '@types';
import { UseFormWatch } from 'react-hook-form';
type DialysisPreHdStepAccessManagementProps = {
  control: Control<PreHDForm>;
  accessManagement: VascularAccessManagementResponse | CvcAccessManagementResponse;
  isMulti: boolean;
  index: number;
  watch: UseFormWatch<PreHDForm>;
};
declare const DialysisPreHdStepAccessManagement: ({
  control,
  accessManagement,
  isMulti,
  index,
  watch,
}: DialysisPreHdStepAccessManagementProps) => JSX.Element;
export default DialysisPreHdStepAccessManagement;
