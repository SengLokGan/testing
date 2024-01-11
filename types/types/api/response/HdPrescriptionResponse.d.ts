import { DoctorTypes } from '@enums';
export interface Doctor {
  name?: string;
  source: DoctorTypes;
  internalDoctorId?: number;
  speciality?: string;
  deleted?: boolean;
}
