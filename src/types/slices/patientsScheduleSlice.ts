import {
  AppointmentsSchedulesResponse,
  IndividualLabTestPlanEvent,
  IsolationGroupsSummaryResponse,
  QuarterlyBloodTestEvent,
  ShiftsResponse,
  ShortServices,
} from '@types';

export type IsoGroupAvailability = {
  isolationGroupId: string;
  shifts: { id: string; name: string }[];
};
export interface PatientsScheduleSliceState {
  loading: boolean;
  error: string | null;
  scheduleDate: Date;
  shifts: ShiftsResponse;
  isolationsGroup: IsolationGroupsSummaryResponse;
  appointments: AppointmentsSchedulesResponse;
  services: ShortServices | null;
  dayTasks: (QuarterlyBloodTestEvent | IndividualLabTestPlanEvent)[];
  patientActiveHd: any | null;
  currentDayAvailabilityShifts: IsoGroupAvailability[];
}
