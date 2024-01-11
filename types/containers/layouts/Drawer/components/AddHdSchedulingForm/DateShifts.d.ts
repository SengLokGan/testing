/// <reference types="react" />
import { Control, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { HdSchedulingForm } from '@types';
import { UseFieldArrayRemove, UseFormSetValue } from 'react-hook-form';
type DateShiftsProps = {
  index: number;
  control: Control<HdSchedulingForm>;
  watch: UseFormWatch<HdSchedulingForm>;
  trigger: UseFormTrigger<HdSchedulingForm>;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<HdSchedulingForm>;
  availability: {
    [key: string]: {
      value: string;
      label: string;
    }[];
  };
};
export declare const DateShifts: ({
  index,
  watch,
  control,
  trigger,
  remove,
  setValue,
  availability,
}: DateShiftsProps) => JSX.Element;
export {};
