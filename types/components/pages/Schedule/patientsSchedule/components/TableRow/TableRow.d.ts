/// <reference types="react" />
import { SlotData } from '@types';
type TableRowProps = {
  isIsoGroup: boolean;
  shiftCount: number;
  slotKey: string;
  index: number;
  rowData: SlotData;
  isoKey: string;
};
export declare const TableRow: ({
  isIsoGroup,
  shiftCount,
  slotKey,
  index,
  rowData,
  isoKey,
}: TableRowProps) => JSX.Element;
export {};
