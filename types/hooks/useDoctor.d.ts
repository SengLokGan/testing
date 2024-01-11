import { DoctorRequestType } from '@types';
export declare const useDoctor: (
  formData: any,
  doctorsNameField: any,
  selectedDoctor?: DoctorRequestType,
) => {
  isExternalDoctor: boolean;
  specialities: never[];
};
