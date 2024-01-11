/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import type { PreHDForm } from '@types';
import { CvcAccessManagementResponse, VascularAccessManagementResponse } from '@types';
import { UseFormWatch } from 'react-hook-form';
type DialysisPreHdStepAccessManagementGroupProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  accessManagements?: (VascularAccessManagementResponse | CvcAccessManagementResponse)[];
};
declare const DialysisPreHdStepAccessManagementGroup: ({
  control,
  watch,
  accessManagements,
}: DialysisPreHdStepAccessManagementGroupProps) => JSX.Element | null;
export default DialysisPreHdStepAccessManagementGroup;
