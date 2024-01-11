import type { Column } from '@types';
import i18n from 'i18next';
import {
  DialysisMachineConnectedBayColumn,
  DialysisMachineStatusColumn,
  DialysisMachineWarrantyColumn,
  DialysisMachineNameColumn,
} from '@components/pages/Administration/subPages/DialysisMachines/components';

export const getDialysisMachinesViewTableColumns = (): Column[] => [
  {
    id: 'name',
    label: i18n.t('dialysisMachines:table.name'),
    width: 200,
    sticky: true,
    maxWidth: 200,
    format: (_, data) => <DialysisMachineNameColumn id={data.id}>{data.name}</DialysisMachineNameColumn>,
  },
  {
    id: 'status',
    label: i18n.t('dialysisMachines:table.status'),
    width: 200,
    maxWidth: 200,
    format: (status) => <DialysisMachineStatusColumn status={status} />,
  },
  {
    id: 'serialNumber',
    label: i18n.t('dialysisMachines:table.serialNumber'),
    width: 200,
    maxWidth: 200,
  },
  {
    id: 'model',
    label: i18n.t('dialysisMachines:table.model'),
    width: 200,
    maxWidth: 200,
  },
  {
    id: 'brand',
    label: i18n.t('dialysisMachines:table.brand'),
    width: 200,
    maxWidth: 200,
  },
  {
    id: 'location',
    label: i18n.t('dialysisMachines:table.connectedBay'),
    width: 200,
    maxWidth: 200,
    format: (location) => <DialysisMachineConnectedBayColumn location={location} />,
  },
  {
    id: 'warrantyFinished',
    label: i18n.t('dialysisMachines:table.warranty'),
    width: 200,
    maxWidth: 200,
    format: (warrantyFinished) => <DialysisMachineWarrantyColumn warrantyFinished={warrantyFinished} />,
  },
  {
    id: 'isolationGroup',
    label: i18n.t('dialysisMachines:table.infectionStatus'),
    width: 200,
    maxWidth: 200,
    format: (isolationGroup) => isolationGroup?.name || i18n.t('dialysisMachines:nonInfection'),
  },
];
