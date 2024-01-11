import { Column } from '@types';
import i18n from 'i18next';
import { CellType } from '@enums/components';
import { TodayInjectionsTableInjectionsColumn } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableInjectionsColumn';
import { TodayInjectionsTablePreparedColumn } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTablePreparedColumn';
import { TodayInjectionsTableStatusColumn } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableStatusColumn';
import { getColumnSizes } from '@utils/table';
import { TodayInjectionsTableAmountColumn } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableAmountColumn';

const commonSxForSingularColumns = {
  verticalAlign: 'top',
};

export const getTodayInjectionsTableColumns = (): Column[] => [
  {
    id: 'shiftId',
    label: '№',
    cellType: CellType.AutoIncrement,
    ...getColumnSizes(56),
    sx: {
      ...commonSxForSingularColumns,
      pt: 2,
    },
  },
  {
    id: 'name',
    label: i18n.t('todayPatients:injectionsTableView.patientName'),
    cellType: CellType.Avatar,
    ...getColumnSizes(300),
    format: (value, { id, name, photoPath }) => ({ id, name, photoPath }),
    sx: {
      ...commonSxForSingularColumns,
      pt: 1.25,
    },
  },
  {
    id: 'bay',
    label: i18n.t('todayPatients:injectionsTableView.bay'),
    ...getColumnSizes(62),
    sx: {
      ...commonSxForSingularColumns,
      pt: 2,
    },
  },
  {
    id: 'todayInjections',
    label: i18n.t('todayPatients:injectionsTableView.todayInjections'),
    ...getColumnSizes(412),
    format: (_, { injections }) => <TodayInjectionsTableInjectionsColumn injections={injections} />,
    sx: {
      ...commonSxForSingularColumns,
      pt: 2,
    },
  },
  {
    id: 'amount',
    label: i18n.t('todayPatients:injectionsTableView.amount'),
    ...getColumnSizes(62),
    format: (_, { injections }) => <TodayInjectionsTableAmountColumn injections={injections} />,
    sx: {
      ...commonSxForSingularColumns,
      pt: 2,
    },
  },
  {
    id: 'prepared',
    label: i18n.t('todayPatients:injectionsTableView.prepared'),
    ...getColumnSizes(62),
    format: (_, { injections, appointmentId }) => (
      <TodayInjectionsTablePreparedColumn appointmentId={appointmentId} injections={injections} />
    ),
    sx: {
      ...commonSxForSingularColumns,
      pt: 2,
    },
  },
  {
    id: 'status',
    label: i18n.t('todayPatients:injectionsTableView.status'),
    ...getColumnSizes(62),
    format: (_, { injections }) => <TodayInjectionsTableStatusColumn injections={injections} />,
    sx: {
      ...commonSxForSingularColumns,
      pt: 2,
    },
  },
];
