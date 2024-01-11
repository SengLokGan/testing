import { LabMealStatus, LabOrderStatus, LabOrderType, LabPriority, LabSpecimenType } from '@enums';
import { UserEntity } from '@src/types';
export interface DialysisServicesResponse {
  hemodialysis: any;
  medications: any;
  vaccines: any;
  labOrders: LabOrdersServiceResponse[];
  skipInfo: any;
}
export interface LabOrdersServiceResponse {
  appointmentDate: string;
  createdAt: string;
  id: number;
  labId: string;
  labName: string;
  number: number;
  patient: {
    id: string;
    name: string;
  };
  planDate: string;
  planId: number;
  priority: LabPriority;
  procedureId: string;
  procedureName: string;
  resultInputType: string;
  specimenType: LabSpecimenType;
  status: LabOrderStatus;
  type: LabOrderType;
  mealStatus?: LabMealStatus;
  performedAt?: string;
  performedBy?: UserEntity;
  comments?: string;
}
