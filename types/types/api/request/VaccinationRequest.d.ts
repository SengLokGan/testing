import { VaccinationDossingSchedule, VaccinationType } from '@enums';
import { FormFile, Doctor, VaccineType } from '@types';
export interface VaccinationToAdministerRequest {
  type: VaccinationType;
  prescriptionDate: string;
  dossingSchedule: VaccinationDossingSchedule;
  comments?: string;
  vaccineType: VaccineType;
  administerDate: string;
  prescribedBy: Doctor;
  amount: number;
}
export interface VaccinationAlreadyAdministeredRequest
  extends Omit<VaccinationToAdministerRequest, 'prescribedBy' | 'prescriptionDate'> {
  clinic?: {
    name: string;
    branchId?: number;
  };
  administerDate: string;
  files?: FormFile[];
}
