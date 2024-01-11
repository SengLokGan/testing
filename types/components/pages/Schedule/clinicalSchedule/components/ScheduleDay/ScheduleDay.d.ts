/// <reference types="react" />
import { PickersDayProps } from '@mui/x-date-pickers';
import { ClinicalEvent } from '@types';
type ScheduleDayProps = {
  events?: {
    [key: number]: {
      [key: string]: ClinicalEvent[];
    };
  };
  setAnchorEl?: (ref: HTMLButtonElement | null) => void;
  monthIndex?: number;
};
export declare const ScheduleDay: ({
  events,
  setAnchorEl,
  monthIndex,
  ...props
}: PickersDayProps<Date> & ScheduleDayProps) => JSX.Element;
export {};
