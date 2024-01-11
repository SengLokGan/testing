import { format } from 'date-fns';
import { Tooltip, Typography } from '@mui/material';
import { getColumnSizes } from '@utils/table';
import { Column } from '@types';
import i18n from 'i18next';
import { HdReadingActions } from '@constants/components/HdReadingActions';

export const ROWS_HIGHLIGHT_TIME_DELAY = 5000;

export const getDialysisHdReadingTableColumns = (): Column[] => [
  {
    id: 'time',
    label: i18n.t('dialysis:form.time'),
    format: (value) => {
      return format(new Date(value), 'hh:mm a');
    },
    sticky: true,
    ...getColumnSizes(128),
  },
  {
    id: 'systolicBp',
    label: i18n.t('dialysis:form.systolic'),
    ...getColumnSizes(80),
  },
  {
    id: 'diastolicBp',
    label: i18n.t('dialysis:form.diastolic'),
    ...getColumnSizes(90),
  },
  {
    id: 'hr',
    label: i18n.t('dialysis:form.hr'),
    ...getColumnSizes(80),
  },
  {
    id: 'ap',
    label: i18n.t('dialysis:form.ap'),
    ...getColumnSizes(80),
  },
  {
    id: 'vp',
    label: i18n.t('dialysis:form.vp'),
    ...getColumnSizes(80),
  },
  {
    id: 'tmp',
    label: i18n.t('dialysis:form.tmp'),
    ...getColumnSizes(80),
  },
  {
    id: 'ufRate',
    label: 'ufr',
    ...getColumnSizes(80),
  },
  {
    id: 'qb',
    label: i18n.t('dialysis:form.qb'),
    ...getColumnSizes(80),
  },
  {
    id: 'qd',
    label: i18n.t('dialysis:form.qd'),
    ...getColumnSizes(80),
  },
  {
    id: 'heparinRate',
    label: i18n.t('dialysis:form.hepRate'),
    ...getColumnSizes(116),
  },
  {
    id: 'cumHeparin',
    label: i18n.t('dialysis:form.cumHep'),
    ...getColumnSizes(116),
  },
  {
    id: 'cumUf',
    label: i18n.t('dialysis:form.cumUf'),
    ...getColumnSizes(100),
  },
  {
    id: 'totalUf',
    label: i18n.t('dialysis:form.totalUf'),
    ...getColumnSizes(100),
  },
  {
    id: 'conductivity',
    label: i18n.t('dialysis:form.cond'),
    ...getColumnSizes(100),
  },
  {
    id: 'dialysateTemp',
    label: i18n.t('dialysis:form.temp'),
    ...getColumnSizes(100),
  },
  {
    id: 'ktV',
    label: i18n.t('dialysis:form.ktV'),
    ...getColumnSizes(100),
  },
  {
    id: 'urr',
    label: `${i18n.t('dialysis:form.urr')}${i18n.t('dialysis:form.percent')}`,
    ...getColumnSizes(100),
  },
  {
    id: 'duringHdNotes',
    label: i18n.t('dialysis:form.duringHdNotes'),
    format: (value) => {
      if (!value || value.length < 30) return value;
      return (
        <Tooltip title={value}>
          <Typography variant="labelM" sx={{ whiteSpace: 'pre-wrap' }}>{`${value.slice(0, 30)}...`}</Typography>
        </Tooltip>
      );
    },
    ...getColumnSizes(312),
  },
  {
    id: 'signedBy',
    label: i18n.t('dialysis:form.sign'),
    ...getColumnSizes(118),
  },
  {
    id: 'bay',
    label: i18n.t('dialysis:form.bayNumber'),
    ...getColumnSizes(118),
  },
  {
    id: 'id',
    label: '',
    ...getColumnSizes(80),
    format: (hdReadingId) => <HdReadingActions id={hdReadingId} />,
  },
];
