import { format } from 'date-fns';
import i18n from 'i18next';
import { Dictionaries } from '@utils';
import { getColumnSizes } from '@utils/table';
import { Column } from '@types';
import { CellType, LabOrderStatus, LabOrderType } from '@enums';
import { LabOrderActions } from '@components/laboratories/components/LabOrderActions';
import { LabOrderPrintButton } from '@components/pages/PatientProfile/subPages/LabResults/LabOrderPrintButton';
import uniqId from 'uniqid';

export const getLabOrdersTableColumns = (): Column[] => [
  {
    id: 'procedureName',
    label: i18n.t('labOrders:tables.ordersView.procedure'),
    ...getColumnSizes(196),
    sticky: true,
    cellType: CellType.Checkbox,
  },
  {
    id: 'patient',
    label: i18n.t('labOrders:tables.ordersView.patient'),
    cellType: CellType.WithoutAvatar,
    ...getColumnSizes(160),
  },
  {
    id: 'document',
    label: i18n.t('labOrders:tables.ordersView.nricPassport'),
    ...getColumnSizes(160),
    format: (value: any) => value?.number,
  },
  {
    id: 'number',
    label: i18n.t('labOrders:tables.ordersView.labOrderNumber'),
    ...getColumnSizes(107),
  },
  {
    id: 'id',
    label: '',
    format: (value) => <LabOrderPrintButton orderId={value} />,
  },
  {
    id: 'status',
    label: i18n.t('labOrders:tables.ordersView.orderStatus'),
    ...getColumnSizes(164),
    cellType: CellType.LabOrderStatus,
    format: (value) => (value === 'NEW' ? LabOrderStatus.TO_PERFORM : value),
  },
  {
    id: 'specimenType',
    label: i18n.t('labOrders:tables.ordersView.specimenType'),
    ...getColumnSizes(120),
    format: (value) => (value ? i18n.t(`${Dictionaries.LabOrdersSpecimenTypes}:${value}`) || value : '—'),
  },
  {
    id: 'planDate',
    label: i18n.t('labOrders:tables.ordersView.planDate'),
    format: (value, fullData) => {
      if (fullData?.status === LabOrderStatus.DRAFT) {
        return `${i18n.t('labOrders:tables.ordersView.quarterShortCut')}${fullData?.quarterNumber}`;
      }
      return value && format(new Date(value), 'dd/MM/yyyy');
    },
    ...getColumnSizes(180),
  },
  {
    id: 'appointmentDate',
    label: i18n.t('labOrders:tables.ordersView.appointmentDate'),
    format: (value) => {
      return value && format(new Date(value), 'dd/MM/yyyy');
    },
    ...getColumnSizes(180),
  },
  {
    id: 'performedAt',
    label: i18n.t('labOrders:tables.ordersView.performedDate'),
    format: (value) => {
      return value && format(new Date(value), 'dd/MM/yyyy hh:mm a');
    },
    ...getColumnSizes(180),
  },
  {
    id: 'shift',
    label: i18n.t('labOrders:tables.ordersView.shift'),
    ...getColumnSizes(105),
  },
  {
    id: 'mealStatus',
    label: i18n.t('labOrders:tables.ordersView.mealStatus'),
    ...getColumnSizes(120),
    format: (value) => (value ? i18n.t(`${Dictionaries.LabOrdersMealStatus}:${value}`) || value : '—'),
  },
  {
    id: 'labName',
    label: i18n.t('labOrders:tables.ordersView.labName'),
    ...getColumnSizes(155),
  },
  {
    id: 'submittedAt',
    label: i18n.t('labOrders:tables.ordersView.submissionDate'),
    format: (value) => {
      return value && format(new Date(value), 'dd/MM/yyyy');
    },
    ...getColumnSizes(180),
  },
  {
    id: 'resultDate',
    label: i18n.t('labOrders:tables.ordersView.resultDate'),
    format: (value) => {
      return value && format(new Date(value), 'dd/MM/yyyy');
    },
    ...getColumnSizes(180),
  },
  {
    id: 'resultInput',
    label: i18n.t('labOrders:tables.ordersView.resultInput'),
    ...getColumnSizes(180),
  },
  {
    id: 'type',
    label: i18n.t('labOrders:tables.ordersView.orderType'),
    format: (value, fullData) => {
      return value
        ? `${i18n.t(`${Dictionaries.LabOrderTypeFilter}:${value}`)} ${
            value === LabOrderType.QUARTERLY ? format(new Date(fullData.createdAt), 'yyyy') : ''
          }`
        : '—';
    },
    ...getColumnSizes(180),
  },
  {
    id: 'id',
    label: i18n.t('labOrders:tables.ordersView.actions'),
    ...getColumnSizes(100),
    format: (orderId, fullData) => <LabOrderActions orderId={orderId} key={uniqId()} fullData={fullData} />,
  },
];
