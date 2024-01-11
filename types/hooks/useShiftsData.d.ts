import type { ShiftSchedulerData } from '@types';
export declare const useShiftsData: (
  isolationGroupId: number | string,
  startDate: Date | string | null,
) => {
  shiftsData: ShiftSchedulerData;
  isLoading: boolean;
};
