/// <reference types="react" />
import type { Injection } from '@types';
type TodayInjectionsTablePreparedColumnProps = {
  injections: Injection[];
  appointmentId: number;
};
export declare const TodayInjectionsTablePreparedColumn: ({
  appointmentId,
  injections,
}: TodayInjectionsTablePreparedColumnProps) => JSX.Element;
export {};
