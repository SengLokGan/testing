/// <reference types="react" />
import type { TodayPatientPlannedPatientWithInjections } from '@types';
type TodayInjectionsTableProps = {
  data: TodayPatientPlannedPatientWithInjections[];
  isLoading: boolean;
  filters: string[];
};
export declare const TodayInjectionsTable: ({ data, filters, isLoading }: TodayInjectionsTableProps) => JSX.Element;
export {};
