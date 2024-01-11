/// <reference types="react" />
import { WithSx, Column } from '@types';
type TableHeaderRowProps = {
  columns: WithSx<Column>[];
  handleMoveColumn: () => any;
  handleResize: (index: number, width: number) => any;
  stickyHeader: boolean;
  getStickyPosition: (index: number, width?: number) => any;
  renderRightBorder: (theme: any) => string;
};
export declare const TableHeaderRow: ({
  columns,
  handleMoveColumn,
  handleResize,
  getStickyPosition,
  renderRightBorder,
  stickyHeader,
}: TableHeaderRowProps) => JSX.Element;
export {};
