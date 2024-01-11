import { Column } from '@types';
import { CellType, PatientStatuses } from '@enums';
import i18n from 'i18next';

export const getPatientsOverviewTableColumns = (): Column[] => [
  {
    id: 'name',
    label: i18n.t('patient:table.name'),
    width: 200,
    sticky: true,
    cellType: CellType.Avatar,
    maxWidth: 200,
  },
  { id: 'document', label: i18n.t('patient:table.nricPass'), width: 200 },
  { id: 'gender', label: i18n.t('patient:table.gender'), width: 500 },
  {
    id: 'access',
    label: i18n.t('patient:table.access'),
    width: 500,
    format: (value) => (!value || !value.length ? i18n.t('common:NA') : value),
  },
  { id: 'hdSchedule', label: i18n.t('patient:table.hdSchedule'), width: 500 },
  { id: 'treatments', label: i18n.t('patient:table.treatments'), width: 500 },
  { id: 'missedTreatment', label: i18n.t('patient:table.missedTreatments'), width: 116 },
  { id: 'isolation', label: i18n.t('patient:table.isolation'), width: 112, cellType: CellType.Virology },
  {
    id: 'idwg',
    label: i18n.t('patient:table.idwg'),
    width: 100,
    format: (value, fullData) => {
      if (!value) {
        return fullData.status === PatientStatuses.Walk_In ? i18n.t('common:NA') : '';
      }
      return `${value} ${i18n.t('common:kg')}`;
    },
  },
  { id: 'primaryNurse', label: i18n.t('patient:table.primaryNurse'), width: 1000 },
];
