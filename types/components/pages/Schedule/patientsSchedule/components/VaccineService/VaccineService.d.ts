/// <reference types="react" />
import { ShiftServices, VaccinationServices } from '@types';
type VaccineServiceProps = {
  vaccine?: VaccinationServices;
  openServicesScreen: () => void;
  shift: ShiftServices;
};
export declare const VaccineService: ({ vaccine, openServicesScreen, shift }: VaccineServiceProps) => JSX.Element;
export {};
