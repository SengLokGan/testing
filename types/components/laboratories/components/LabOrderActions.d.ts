/// <reference types="react" />
import { LabOrderTableData } from '@types';
type LabOrderActionsProps = {
  orderId: string;
  fullData: LabOrderTableData;
};
export declare const LabOrderActions: ({ orderId, fullData }: LabOrderActionsProps) => JSX.Element | null;
export {};
