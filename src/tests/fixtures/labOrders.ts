import {
  LabMealStatus,
  LabOrderStatus,
  LabOrderType,
  LabPriority,
  LabResultInputType,
  LabSpecimenType,
  PatientDocumentType,
} from '@enums';
import { LabOrdersContent } from '@types';

let id = 0;

export const labOrderContentFixture = (data: Partial<LabOrdersContent> = {}): LabOrdersContent => {
  return {
    id: id++,
    type: LabOrderType.INDIVIDUAL,
    appointmentDate: new Date().toString(),
    planDate: new Date().toString(),
    planId: '1',
    patient: {
      id: 1,
      name: 'Patient Name',
      document: {
        type: PatientDocumentType.NRIC,
        number: 'ET2312322333',
      },
    },
    procedureId: 1,
    procedureName: 'RTD-1',
    labId: 1,
    labName: 'Laboratory #1',
    createdAt: new Date().toString(),
    sampledAt: new Date().toString(),
    performedAt: new Date().toString(),
    number: 123123123,
    mealStatus: LabMealStatus.UNKNOWN,
    specimenType: LabSpecimenType.BLOOD,
    priority: LabPriority.ROUTINE,
    shift: '1st',
    resultInputType: LabResultInputType.Lab,
    resultNumber: '1',
    completedAt: new Date().toString(),
    completedBy: { id: 1, name: 'Test' },
    submittedAt: new Date().toString(),
    resultDate: new Date().toString(),
    status: LabOrderStatus.TO_PERFORM,
    ...data,
  };
};
