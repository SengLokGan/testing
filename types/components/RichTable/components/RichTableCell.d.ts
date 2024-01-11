/// <reference types="react" />
import { WithSx } from '@types';
import { CellType } from '@enums';
import type { TableCellProps } from '@mui/material/TableCell';
type RichTableCellProps = WithSx<{
  sticky?: boolean;
  width?: number;
  maxWidth?: number | string;
  minWidth?: number | string;
  data: any;
  fullData?: any;
  cellCallback?: (props: any) => void;
  cellType?: CellType;
  rowKey?: string;
  rowIndex?: number;
  pagination?: {
    currentPage: number;
    perPage: number;
  };
  isCollapsed?: boolean;
  toggleCollapse?: (key: string) => void;
  format?: (value: string, fullData: any) => any;
  formatLabel?: (value: string, fullData: any) => any;
  checked?: boolean;
  dotsTextOverflow?: boolean;
  multiLines?: boolean;
  onRowSelect?: () => void;
  disabled?: boolean;
}> &
  TableCellProps;
export declare const RichTableCell: import('react').MemoExoticComponent<
  ({
    sticky,
    cellType,
    data,
    fullData,
    width,
    minWidth,
    maxWidth,
    sx,
    rowKey,
    rowIndex,
    pagination,
    isCollapsed,
    toggleCollapse,
    cellCallback,
    format,
    checked,
    disabled,
    dotsTextOverflow,
    multiLines,
    onRowSelect,
    ...props
  }: RichTableCellProps) => JSX.Element
>;
export {};
