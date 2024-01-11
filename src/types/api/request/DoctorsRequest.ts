import { DoctorTypes } from '@enums';

export type DoctorRequestType = {
  source: DoctorTypes;
  internalDoctorId?: number;
  name?: string;
  speciality?: string | number;
};
