import { Column } from '@types';
import { CellType } from '@enums';
import i18n from 'i18next';
import { format } from 'date-fns';

export const getAppointmentsTableColumns = (): Column[] => [
  {
    id: 'id',
    label: '№',
    cellType: CellType.AutoIncrement,
    width: 62,
    minWidth: 62,
    maxWidth: 62,
  },
  {
    id: 'name',
    label: i18n.t('todayPatients:tableView.patientName'),
    cellType: CellType.Avatar,
    width: 224,
    minWidth: 224,
  },
  {
    id: 'hdProgress',
    label: i18n.t('todayPatients:tableView.hdProgress'),
    cellType: CellType.HdProgress,
    width: 224,
    minWidth: 224,
  },
  {
    id: 'bay',
    label: i18n.t('todayPatients:tableView.bay'),
    width: 140,
    minWidth: 140,
    format: (value) => (!value || !value.length ? i18n.t('common:NA') : value),
  },
  {
    id: 'startTime',
    label: i18n.t('todayPatients:tableView.startTime'),
    width: 140,
    minWidth: 100,
    format: (value) => (value ? format(new Date(value), 'hh:mm:ss aa') : 'N.A.'),
  },
  {
    id: 'endTime',
    label: i18n.t('todayPatients:tableView.endTime'),
    width: 100,
    minWidth: 100,
    format: (value) => (value ? format(new Date(value), 'hh:mm:ss aa') : 'N.A.'),
  },
  {
    id: 'isolation',
    label: i18n.t('todayPatients:tableView.isolation'),
    cellType: CellType.Virology,
    width: 100,
    minWidth: 100,
  },
  {
    id: 'tags',
    label: i18n.t('todayPatients:tableView.specialNotes'),
    cellType: CellType.SpecialNotes,
    width: 224,
    minWidth: 224,
  },
];
