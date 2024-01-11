import type { OneDayCalendarData, AppointmentSchedule, IsolationGroupSummary, Shift } from '@types';
export declare const prepareOneDayCalendarData: (
  appointments: AppointmentSchedule[],
  isolationGroups: IsolationGroupSummary[],
  shifts: Shift[],
) => OneDayCalendarData;
export declare const sortOneDayCalendarData: (
  calendarData: OneDayCalendarData,
  shifts: Shift[],
  slotDuration: number,
) => OneDayCalendarData;
