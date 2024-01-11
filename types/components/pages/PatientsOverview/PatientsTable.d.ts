import { PropsWithChildren } from 'react';
import { Pagination } from '@types';
type PatientsTableProps = PropsWithChildren<{
  pagination: Pagination;
}>;
export declare const PatientsTable: ({ pagination, children }: PatientsTableProps) => JSX.Element;
export {};
