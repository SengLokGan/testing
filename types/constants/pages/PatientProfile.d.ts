import { AllergiesInfo, Answer, Treatment } from '@enums';
import { Column } from '@types';
export declare const mainInfoFields: string[];
export declare const mobileMainInfoFields: string[];
export declare const familyInfoFields: string[];
export declare const clinicalInfoFields: string[];
export declare const documentsFields: string[];
export declare const treatmentInfoFields: string[];
export declare const billingInformationFields: string[];
export declare const treatmentOptions: () => (
  | {
      label: string;
      value: Treatment;
      disabled?: undefined;
    }
  | {
      label: string;
      value: Treatment;
      disabled: boolean;
    }
)[];
export declare const allergiesOptions: () => {
  label: string;
  value: AllergiesInfo;
}[];
export declare const booleanOptions: () => {
  label: string;
  value: Answer;
}[];
export declare const captureSize: {
  width: number;
  height: number;
  captureOption: {
    audio: boolean;
    video: {
      width: number;
      height: number;
      facingMode: string;
    };
  };
};
export declare const getHdPrescriptionsViewTableColumns: () => Column[];
export declare const getVaccinationViewTableColumns: () => Column[];
export declare const getMedicationsViewTableColumns: () => Column[];
export declare const getAccessManagementsViewTableColumns: () => Column[];
