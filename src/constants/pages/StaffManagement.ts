import type { Column } from '@types';
import i18n from 'i18next';
import { CellType } from '@enums/components';
import { ROUTES } from '@constants/global';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';
import { OTHERS } from '@components/pages/TodayPatients';

export const getStaffListViewTableColumns = (): Column[] => [
  {
    id: 'name',
    label: i18n.t('staffManagement:name'),
    cellType: CellType.Avatar,
    format: (value, rowData) => ({
      id: rowData.id,
      name: value,
      photoPath: rowData?.photoPath ?? '',
      redirectTo: `/${ROUTES.administration}/${ROUTES.staffManagement}/${rowData.id}/${ROUTES.staffProfile}`,
    }),
  },
  {
    id: 'document',
    label: i18n.t('staffManagement:documentType'),
    format: (value) => value.number,
  },
  {
    id: 'gender',
    label: i18n.t('staffManagement:gender'),
    format: (value) => (value !== OTHERS ? getCodeValueFromCatalog('gender', value?.code) : value.extValue),
  },
  {
    id: 'roles',
    label: i18n.t('staffManagement:role'),
    format: (value) => value.join(', '),
  },
  {
    id: 'specialities',
    label: i18n.t('staffManagement:responsibilities'),
    format: (value) => value.join(', '),
  },
];
