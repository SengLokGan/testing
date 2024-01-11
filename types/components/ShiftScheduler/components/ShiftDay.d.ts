import { PropsWithChildren } from 'react';
import { DaysOfWeek } from '@enums';
type ShiftDayProps = PropsWithChildren<{
  name: string;
  shiftId: number;
  shiftName: string;
  day: DaysOfWeek;
  available: boolean;
  selected: boolean;
  onClick: (shiftId: number, shiftName: string, day: DaysOfWeek) => void;
  onHover: (shiftId: number | null, day: DaysOfWeek | null) => void;
}>;
declare const ShiftDay: ({
  name,
  available,
  shiftId,
  shiftName,
  day,
  selected,
  onHover,
  onClick,
  children,
}: ShiftDayProps) => JSX.Element;
export default ShiftDay;
