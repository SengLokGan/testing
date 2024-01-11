import { ReactNode } from 'react';
import { WithSx } from '@types';
import { CellType, RowType } from '@enums';
export interface TableConfig {
  sx?: any;
  width?: number;
  maxWidth?: number | string;
  minWidth?: number | string;
  align?: 'right' | 'left';
  sticky?: boolean;
  format?: (value: any, fullData: any) => any;
  formatLabel?: (value: string, fullData: any) => any;
  cellCallback?: (props: any) => void;
  sortableCallback?: () => void;
  cellType?: CellType;
}
export interface Column extends TableConfig {
  id: string;
  label: string;
  withRightBorder?: boolean;
  dotsTextOverflow?: boolean;
  multiLines?: boolean;
  disabled?: boolean;
}
export interface Row {
  [key: string]: any;
  rowType?: RowType;
  payload?: ReactNode;
  rowCategoryParams?: WithSx<{
    [key: string]: any;
  }>;
  id: string | number;
}
export type HighlightedRow = {
  id: number | string;
  color: string;
};
