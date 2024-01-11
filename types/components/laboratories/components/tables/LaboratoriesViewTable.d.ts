import type { PropsWithChildren } from 'react';
import type { Column } from '@types';
type LaboratoriesViewTableProps = PropsWithChildren<{
  columns: Column[];
}>;
export declare const LaboratoriesViewTable: ({ columns, children }: LaboratoriesViewTableProps) => JSX.Element;
export {};
