/// <reference types="react" />
import { VaccinationMedicationResolution, VaccinationStatus, LabOrderStatus } from '@enums';
export declare const getMedicationIcon: (
  status: VaccinationMedicationResolution | undefined,
  isServicePopup?: boolean,
) => JSX.Element;
export declare const getLabOrderIcon: (status: LabOrderStatus, isServicePopup?: boolean) => JSX.Element | undefined;
export declare const getVaccineIcon: (status: VaccinationStatus, isServicePopup?: boolean) => JSX.Element;
