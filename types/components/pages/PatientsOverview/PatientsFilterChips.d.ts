/// <reference types="react" />
import type { WithSx, PatientIsolationFilterItem } from '@types';
type IsolationFilterChipsProps = WithSx<{
  allIsolatorFilters: {
    items: PatientIsolationFilterItem[];
  };
  patientNameFilter: {
    name: string;
    id: string;
  } | null;
  onChipFilterClick: (name: string, filterType: 'isolations' | 'patient') => void;
  onClearAllClick: () => void;
}>;
export declare const PatientsFilterChips: ({
  allIsolatorFilters,
  patientNameFilter,
  onChipFilterClick,
  onClearAllClick,
  sx,
}: IsolationFilterChipsProps) => JSX.Element;
export {};
