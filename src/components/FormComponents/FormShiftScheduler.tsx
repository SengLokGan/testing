import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { ShiftScheduler } from '@components';
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

export const FormShiftScheduler = <T extends FieldValues>({
  frequency,
  defaultValue,
  availableDays = [],
  data,
  onError = () => {},
  name,
  sx,
  ...props
}: FormShiftSchedulerProps<T>) => {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field: { onChange, ref }, fieldState: { error } }) => {
        const onChangeProxy = (shiftId: number | null, shiftName: string | null, day: DaysOfWeek | null) => {
          onChange({ shiftId, shiftName, day });
          onError(null);
        };

        const onErrorProxy = (reason: ShiftSchedulerErrorReason | null) => {
          onError(reason);
        };

        return (
          <ShiftScheduler
            defaultValue={defaultValue}
            data={data}
            name={name}
            frequency={frequency}
            days={availableDays}
            onChange={onChangeProxy}
            onError={onErrorProxy}
            error={error?.message}
            sx={sx}
            fieldRef={ref}
          />
        );
      }}
    />
  );
};
