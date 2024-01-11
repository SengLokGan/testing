/// <reference types="react" />
import { OneDayCalendarAppointmentStatus } from '@enums/components';
type HDProgressInfoProps = {
  status: OneDayCalendarAppointmentStatus;
  duration: number;
  startTime?: string;
  timeLeft: number;
};
export declare const HDProgressInfo: ({ status, duration, startTime, timeLeft }: HDProgressInfoProps) => JSX.Element;
export {};
