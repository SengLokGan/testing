/// <reference types="react" />
import { OneDayCalendarAppointment } from '@types';
type AppointmentProps = {
  appointment: OneDayCalendarAppointment;
  isIso: boolean;
};
export declare const Appointment: ({ appointment, isIso }: AppointmentProps) => JSX.Element;
export {};
