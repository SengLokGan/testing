import type { AppointmentSchedule } from '@types';
import { ServicesType } from '@enums/components/ServicesType';
export interface OneDayCalendarAppointment extends AppointmentSchedule {
  path: string[];
}
export interface OneDayCalendarData {
  [key: string]: AppointmentsGroup;
}
export interface AppointmentsGroup {
  id: number;
  isoName: string;
  isoKey: string;
  isolations: string[];
  slots: {
    [key: string]: SlotData;
  };
}
export interface SlotData {
  [key: string]: OneDayCalendarAppointment[];
}
export interface ActiveService {
  type: ServicesType;
  id?: number;
}
