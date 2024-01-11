/// <reference types="react" />
import type { TodayPatientPlannedPatientWithInjections } from '@types';
type TodayInjectionsShiftFiltersProps = {
  shiftId: number;
  shiftData: TodayPatientPlannedPatientWithInjections[];
  selectedFilters: string[];
  onSelect: (shiftId: number, injectionLabel: string) => void;
};
export declare const TodayInjectionsShiftFilters: ({
  shiftId,
  shiftData,
  selectedFilters,
  onSelect,
}: TodayInjectionsShiftFiltersProps) => JSX.Element;
export {};
