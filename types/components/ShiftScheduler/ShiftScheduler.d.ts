import { Ref } from 'react';
import { ShiftSchedulerErrorReason, DaysOfWeek, HDPrescriptionScheduleFrequency } from '@enums';
import type { WithSx, ShiftSchedulerData, ShiftSchedulerDefaultValue } from '@types';
type ShiftSchedulerProps = WithSx<{
  name: string;
  data: ShiftSchedulerData;
  frequency: HDPrescriptionScheduleFrequency;
  days: DaysOfWeek[];
  onChange: (shiftId: number | null, shiftName: string | null, day: DaysOfWeek | null) => void;
  defaultValue?: ShiftSchedulerDefaultValue;
  onError?: (reason: ShiftSchedulerErrorReason | null) => void;
  error?: string;
  fieldRef?: Ref<HTMLElement>;
}>;
export declare const ShiftScheduler: ({
  data,
  name,
  defaultValue,
  frequency,
  days,
  onChange,
  error,
  onError,
  sx,
  fieldRef,
}: ShiftSchedulerProps) => JSX.Element;
export {};
