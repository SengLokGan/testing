import { LabSpecimenType } from '@enums/components';

export enum AddHocEventTypes {
  NEPHROLOGIST_REVIEW = 'NEPHROLOGIST_REVIEW',
  PIC_REVIEW = 'PIC_REVIEW',
  HD = 'HEMODIALYSIS',
  LAB_TEST = 'URGENT_LAB_ORDER',
}

export type AddHocEventFormType = {
  type: AddHocEventTypes;
  patient?: { value: number; label: string } | null;
  labTestPatient?: { value: number; label: string } | null;
  date: Date | null;
  shift?: { value: number; label: string } | null;
  procedure?: { value: number; label: string } | null;
  laboratory?: { value: string; label: string } | null;
  specimenType?: LabSpecimenType;
};
