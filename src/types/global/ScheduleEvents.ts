import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import { AddHocEventTypes } from '@src/types';
import { LabOrderStatus } from '@enums';
import { TargetAudience } from '@enums/components/TargetAudience';

export interface CustomEvent {
  id: string;
  type: ClinicalScheduleEventType.CustomEvent;
  title: string;
  comment: string;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    photoPath: string;
  };
  modifiedAt?: string;
  modifiedBy?: {
    id: string;
    name: string;
    photoPath: string;
  };
}

export interface QuarterlyBloodTestEvent {
  id: string;
  type: ClinicalScheduleEventType.QuarterlyBloodTest;
  lab: {
    id: string;
    name: string;
  };
  comment: string;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    photoPath: string;
  };
  modifiedAt?: string;
  modifiedBy?: {
    id: string;
    name: string;
    photoPath: string;
  };
}
export interface StaffHepBVaccinationEvent {
  id: string;
  type: ClinicalScheduleEventType.StaffHepBVaccination;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  comment: string;
}
export interface StaffSerologyScreeningEvent {
  id: string;
  type: ClinicalScheduleEventType.StaffSerologyScreening;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  comment: string;
}
export interface PICVisitEvent {
  id: string;
  type: ClinicalScheduleEventType.PICVisit;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  comment: string;
  doctor: { name: string; id: string };
  targetAudience: TargetAudience;
  dialysisRelated: boolean;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    photoPath: string;
  };
  modifiedAt?: string;
  modifiedBy?: {
    id: string;
    name: string;
    photoPath: string;
  };
}
export interface NephrologistVisitEvent {
  id: string;
  type: ClinicalScheduleEventType.NephrologistVisit;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  comment: string;
  doctor: { name: string; id: string };
  targetAudience: TargetAudience;
  dialysisRelated: boolean;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    photoPath: string;
  };
  modifiedAt?: string;
  modifiedBy?: {
    id: string;
    name: string;
    photoPath: string;
  };
}

export interface IndividualLabTestPlanEventLabOrder {
  id: string;
  procedureName: string;
  status: LabOrderStatus;
}

export interface IndividualLabTestPlanEvent {
  id: string;
  patientId: string;
  patientName: string;
  patientPhotoPath?: string;
  labOrders: IndividualLabTestPlanEventLabOrder[];
  type: AddHocEventTypes.LAB_TEST;
  isAllDay: boolean;
}

export type ClinicalEvent =
  | CustomEvent
  | QuarterlyBloodTestEvent
  | StaffHepBVaccinationEvent
  | StaffSerologyScreeningEvent
  | PICVisitEvent
  | NephrologistVisitEvent;
