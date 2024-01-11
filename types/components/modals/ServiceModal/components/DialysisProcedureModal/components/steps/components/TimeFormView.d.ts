/// <reference types="react" />
import { Control, FieldValues } from 'react-hook-form';
export declare enum TimeFormType {
  START = 0,
  FINISH = 1,
}
type TimeFormViewProps<T extends FieldValues = FieldValues> = {
  open: boolean;
  onClose: () => void;
  type: TimeFormType;
  control: Control<T, any>;
  onSubmit: () => void;
};
export declare const TimeFormView: <T extends FieldValues>({
  control,
  open,
  onClose,
  type,
  onSubmit,
}: TimeFormViewProps<T>) => JSX.Element;
export {};
