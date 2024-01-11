import { ClinicalEventFormType, ClinicalEvent, ShiftsResponse } from '@types';

export interface ClinicalScheduleSliceState {
  loading: boolean;
  error: string | null;
  clinicalScheduleDate: Date;
  events: { [key: number]: { [key: string]: ClinicalEvent[] } };
  shifts: ShiftsResponse;
}
