/// <reference types="react" />
import { AppointmentTableItem } from '@types';
type TodayPatientCardProps = {
  patient: AppointmentTableItem;
};
export declare const TodayPatientCard: ({
  patient: { name, isolation, status, startTime, hdProgress, endTime, bay, tags },
}: TodayPatientCardProps) => JSX.Element;
export {};
