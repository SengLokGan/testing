import { PropsWithChildren } from 'react';
import type { TableCellProps } from '@mui/material/TableCell';
import { WithSx } from '@types';
import { CellType } from '@enums';
type TableHeaderCellProps = PropsWithChildren<
  WithSx<{
    index: number;
    onMoveColumn: (index: number, newIndex: number) => void;
    onResize: (index: number, width: number) => void;
    width?: number;
    minWidth?: number | string;
    maxWidth?: number | string;
    sticky?: boolean;
    stickyHeader?: boolean;
    align?: string;
    cellType?: CellType;
    checked?: boolean;
    indeterminate?: boolean;
    onAllRowsSelect?: () => void;
    format?: (value: string, fullData: any) => any;
    formatLabel?: (value: string, fullData: any) => any;
  }>
> &
  TableCellProps;
export declare const TableHeaderCell: import('react').MemoExoticComponent<
  ({
    index,
    onMoveColumn,
    onResize,
    width,
    minWidth,
    maxWidth,
    stickyHeader,
    sticky,
    align,
    children,
    cellType,
    format,
    checked,
    indeterminate,
    onAllRowsSelect,
    sx,
    ...restProps
  }: TableHeaderCellProps) => JSX.Element
>;
export {};
