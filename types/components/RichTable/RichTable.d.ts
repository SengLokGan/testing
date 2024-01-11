import { PropsWithChildren, ReactNode } from 'react';
import { PaginationComponentProps } from '@components';
import { Column, HighlightedRow, Row, WithSx } from '@types';
type RichTableProps = PropsWithChildren<
  WithSx<{
    tableContainerProps?: WithSx<{}>;
    renderBody?: boolean;
    preColumns?: WithSx<Column>[];
    nextColumns?: WithSx<Column>[];
    columns: WithSx<Column[]>;
    rows: Row[];
    collapsableRow?: boolean;
    multipleCollapse?: boolean;
    renderCollapsableRow?: (item: any) => ReactNode;
    stickyHeader?: boolean;
    fullScreen?: boolean;
    headerDivider?: boolean;
    isDataLoading: boolean;
    defaultHeaderContainer?: boolean;
    rowExtraProps?: {
      condition: (data?: any) => boolean;
      props: any;
    }[];
    highlightedRows?: HighlightedRow[];
    selectedRows?: any[];
    onRowSelect?: (id: number) => void;
    onAllRowsSelect?: () => void;
    multiPagination?: boolean;
    isOuterPaginationHandler?: boolean;
    emptyBodyBGColor?: string;
  }>
> &
  Partial<Omit<PaginationComponentProps, 'isSticky'>>;
export declare const RichTable: ({
  tableContainerProps,
  renderBody,
  preColumns,
  nextColumns,
  stickyHeader,
  collapsableRow,
  multipleCollapse,
  renderCollapsableRow,
  rows,
  columns,
  isDataLoading,
  defaultHeaderContainer,
  children,
  fullScreen,
  headerDivider,
  sx,
  pagination,
  multiPagination,
  isOuterPaginationHandler,
  onChangePage,
  onChangeRowsPerPage,
  rowExtraProps,
  highlightedRows,
  selectedRows,
  onRowSelect,
  onAllRowsSelect,
  emptyBodyBGColor,
}: RichTableProps) => JSX.Element;
export {};
