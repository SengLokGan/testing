import { getTenantDate } from '../../utils';
import { format } from 'date-fns';
import { ClinicalScheduleEventType } from '../../enums/pages/Schedule';
import { AddHocEventTypes } from '../../types';

export const shifts = [
  {
    id: 7,
    name: '1st',
    timeStart: '07:00:00',
    timeEnd: '12:00:00',
  },
  {
    id: 8,
    name: '2st',
    timeStart: '12:00:00',
    timeEnd: '17:00:00',
  },
  {
    id: 9,
    name: '3st',
    timeStart: '17:00:00',
    timeEnd: '22:00:00',
  },
];

export const isolationsGroup = [
  {
    id: 6,
    name: 'Non-infectious',
    locations: 8,
    isolations: [],
  },
  {
    id: 5,
    name: 'Iso1',
    locations: 3,
    isolations: ['HEP_B'],
  },
];

export const appointments = [
  {
    id: 8167,
    patientId: 233,
    patientName: 'First Patient',
    shiftId: 7,
    isolationGroupId: 5,
    status: 'PRE_DIALYSIS',
    duration: 240,
  },
  {
    id: 8432,
    patientId: 232,
    patientName: 'Second Patient',
    shiftId: 7,
    isolationGroupId: 5,
    status: 'CHECK_IN',
    duration: 240,
  },
  {
    id: 8111,
    patientId: 231,
    patientName: 'Third Patient',
    shiftId: 2,
    isolationGroupId: 6,
    status: 'PRE_DIALYSIS',
    duration: 240,
  },
  {
    id: 8169,
    patientId: 211,
    patientName: 'Fourth Patient',
    shiftId: 9,
    isolationGroupId: 6,
    status: 'PRE_DIALYSIS',
    duration: 240,
  },
  {
    id: 833,
    patientId: 212,
    patientName: 'Fifth Patient',
    shiftId: 7,
    isolationGroupId: 6,
    status: 'PRE_DIALYSIS',
    duration: 120,
  },
  {
    id: 8331,
    patientId: 2122,
    patientName: 'Sixth Patient',
    shiftId: 7,
    isolationGroupId: 6,
    status: 'PRE_DIALYSIS',
    duration: 120,
  },
];

export const dayTasks = [
  {
    comment: 'testComment',
    createdAt: '2023-05-17T10:26:35.068404Z',
    createdBy: { id: 1, name: 'Test Test' },
    date: format(getTenantDate(), 'yyyy-MM-dd'),
    endTime: '12:00:00',
    startTime: '07:00:00',
    id: 39,
    isAllDay: false,
    lab: { id: 13, name: 'Hear Records' },
    modifiedAt: '2023-05-17T10:26:35.068404Z',
    type: ClinicalScheduleEventType.QuarterlyBloodTest,
  },
  {
    id: 9835,
    isAllDay: true,
    labOrders: [{ id: 694, procedureName: 'HHH-serology', status: 'TO_PERFORM' }],
    patientId: 364,
    patientName: 'Name',
    type: AddHocEventTypes.LAB_TEST,
  },
  {
    id: 9803,
    isAllDay: true,
    labOrders: [{ id: 663, procedureName: 'RTD-1', status: 'TO_PERFORM' }],
    patientId: 263,
    patientName: 'Test Name',
    patientPhotoPath: '/patients/photos/10000/35530.png',
    type: AddHocEventTypes.LAB_TEST,
  },
];
