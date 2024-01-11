import {
  AppointmentsContentResponse,
  AppointmentsStatusesFilterCountersResponse,
  AppointmentsStatusesFilterItem,
} from '@types';
import { AppointmentsStatusesFilters, AppointmentStatus, DialysisStatus } from '@enums';
export declare const convertAppointmentsToTableFormat: (data: AppointmentsContentResponse[]) => {
  name: {
    id: number;
    name: string;
    photoPath: string;
  };
  isolation: string[] | null;
  hdProgress: {
    patientId: number;
    appointmentId: number;
  };
  status: DialysisStatus | AppointmentStatus.Waiting | AppointmentStatus.CheckedIn | AppointmentStatus.Cancelled;
  id: number;
  dialysisId: number;
  bay: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  patientStatus: import('@enums').PatientStatuses;
  specialNotes: import('@enums').SpecialNote[];
}[];
export declare const setAppointmentsStatusesBadges: (
  counters: AppointmentsStatusesFilterCountersResponse,
  statusesFilters: AppointmentsStatusesFilterItem[],
) => {
  badge: string;
  name: AppointmentsStatusesFilters;
  selected: boolean;
}[];
