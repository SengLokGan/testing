import { HdPrescriptionForm, HdSchedulingData, HdPrescription, Shift } from '@types';

export type HdPrescriptionSliceState = {
  prescriptionsLoaded: boolean;
  submitting: boolean;
  loading: boolean;
  saveSuccess: boolean;
  isFileLoading: boolean;
  error: any;
  hdPrescriptionForm: HdPrescriptionForm | null;
  hdSchedulingForm: HdSchedulingData | null;
  schedulingFormDirtyStatus: boolean;
  prescriptions: HdPrescription[];
  shiftDictionary: Shift[];
};
