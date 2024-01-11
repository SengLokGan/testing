/// <reference types="react" />
import { MedicationServices, ShiftServices } from '@types';
type MedicationServiceProps = {
  medication?: MedicationServices;
  openServicesScreen: () => void;
  shift: ShiftServices;
};
export declare const MedicationService: ({
  medication,
  openServicesScreen,
  shift,
}: MedicationServiceProps) => JSX.Element;
export {};
