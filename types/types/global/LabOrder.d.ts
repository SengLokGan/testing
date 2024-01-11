import { LabOrderStatus, PatientDocumentType, LabOrderType } from '@enums';
import { LabOrdersContent } from '@types';
export interface LabOrderLaboratory {
  id: number;
  name: string;
  code: string;
  branchId: number;
  isDefault: boolean;
}
export type LabOrderTableData = Omit<LabOrdersContent, 'patient'> & {
  patient: {
    id: number;
    name: string;
    dateBirth: string | Date;
  };
  planId: string;
  type: LabOrderType;
  document: {
    type: PatientDocumentType;
    number: string;
  };
};
export interface LabOrderStatusCellCallbackProps {
  id: number;
  status: LabOrderStatus;
  data?: any;
}
