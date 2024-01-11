import { DaysOfWeek } from '@enums';
export declare const countSessionsBetweenDates: (
  startDate: Date | null | string,
  endDate: Date | null | string,
  daysOfWeek: DaysOfWeek[],
) => number;
