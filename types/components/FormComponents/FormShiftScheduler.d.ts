/// <reference types="react" />
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ShiftSchedulerErrorReason, DaysOfWeek, HDPrescriptionScheduleFrequency } from '@enums';
import type { WithSx, ShiftSchedulerData } from '@types';
export type FormShiftSchedulerProps<T extends FieldValues> = WithSx<{
  data: ShiftSchedulerData;
  frequency: HDPrescriptionScheduleFrequency;
  name: string;
  availableDays: DaysOfWeek[];
  required?: boolean;
  isDisabled?: boolean;
  onError?: (reason: ShiftSchedulerErrorReason | null) => void;
}> &
  UseControllerProps<T>;
export declare const FormShiftScheduler: <T extends FieldValues>({
  frequency,
  defaultValue,
  availableDays,
  data,
  onError,
  name,
  sx,
  ...props
}: FormShiftSchedulerProps<T>) => JSX.Element;
