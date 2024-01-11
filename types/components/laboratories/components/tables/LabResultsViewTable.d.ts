/// <reference types="react" />
import { Column } from '@types';
interface LabResultsViewTableProps {
  data: any[];
  columns: Column[];
  preColumns?: Column[];
  nextColumns?: Column[];
  isLoading?: boolean;
}
export declare const LabResultsViewTable: ({
  data,
  columns,
  preColumns,
  nextColumns,
  isLoading,
}: LabResultsViewTableProps) => JSX.Element;
export {};
