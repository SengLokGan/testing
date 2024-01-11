/// <reference types="react" />
import type { Pagination, WithSx } from '@types';
import { ActionCreatorWithPayload, AnyAction } from '@reduxjs/toolkit';
export type PaginationComponentProps = WithSx<{
  pagination: Pagination;
  isOuterPaginationHandler?: boolean;
  onChangePage: ActionCreatorWithPayload<number> | ((number: any) => AnyAction);
  onChangeRowsPerPage: ActionCreatorWithPayload<number> | ((number: any) => AnyAction);
  isSticky?: boolean;
}>;
export declare const PaginationComponent: ({
  isSticky,
  pagination,
  isOuterPaginationHandler,
  onChangePage,
  onChangeRowsPerPage,
  sx,
}: PaginationComponentProps) => JSX.Element | null;
