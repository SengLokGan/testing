/// <reference types="react" />
import { LabOrdersService, ShiftServices } from '@types';
type LabOrderServiceProps = {
  labOrder?: LabOrdersService;
  openServicesScreen: () => void;
  shift: ShiftServices;
};
export declare const LabOrderService: ({ labOrder, openServicesScreen, shift }: LabOrderServiceProps) => JSX.Element;
export {};
