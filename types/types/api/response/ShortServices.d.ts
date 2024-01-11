import {
  VaccinationMedicationResolution,
  OneDayCalendarAppointmentStatus,
  VaccinationStatus,
  LabOrderStatus,
} from '@enums';
export interface HemodialysisServices {
  duration: number;
  endedAt: string;
  id: number;
  startedAt: string;
  status: OneDayCalendarAppointmentStatus;
  location: {
    id: string;
    name: string;
  };
}
export interface ShiftServices {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}
export interface MedicationServices {
  id: number;
  name: string;
  status?: VaccinationMedicationResolution;
}
export interface LabOrdersService {
  id: number;
  procedureName: string;
  status: LabOrderStatus;
}
export interface VaccinationServices {
  id: number;
  name: string;
  status: VaccinationStatus;
}
export interface ShortServices {
  hemodialysis: HemodialysisServices;
  labOrders?: LabOrdersService[];
  medications?: MedicationServices[];
  shift: ShiftServices;
  vaccines?: VaccinationServices[];
}
