/// <reference types="react" />
import { OneDayCalendarAppointment } from '@types';
type AppointmentsProps = {
  slotKey: string;
  shift: string;
  appointments: OneDayCalendarAppointment[];
  isIso: boolean;
};
export declare const Appointments: ({ slotKey, shift, appointments, isIso }: AppointmentsProps) => JSX.Element;
export {};
