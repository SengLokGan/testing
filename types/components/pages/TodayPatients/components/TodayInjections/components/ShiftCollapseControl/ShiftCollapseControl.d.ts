/// <reference types="react" />
type ShiftCollapseControlProps = {
  isOpened: boolean;
  shiftId: number;
  shiftName: string;
  onClick: (shiftId: number) => void;
};
export declare const ShiftCollapseControl: ({
  isOpened,
  shiftId,
  shiftName,
  onClick,
}: ShiftCollapseControlProps) => JSX.Element;
export {};
