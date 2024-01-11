import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import i18n from 'i18next';
import { ROUTES } from '@constants/global';
import { IconColors } from '@enums/components';
import { UserPermissions } from '@enums/store';

export const schedulePatients = [
  {
    id: 1,
    title: i18n.t('schedule:patients'),
    label: i18n.t('schedule:patientsAndServices'),
    icon: Diversity1OutlinedIcon,
    link: `/${ROUTES.schedule}/${ROUTES.patients}`,
    iconColor: IconColors.yellow,
    permission: UserPermissions.ViewSchedule,
  },
  {
    id: 2,
    title: i18n.t('schedule:clinicalSchedule'),
    label: i18n.t('schedule:quarterlyDoctorsScreening'),
    icon: InventoryOutlinedIcon,
    link: `/${ROUTES.schedule}/${ROUTES.clinical}`,
    iconColor: IconColors.blue,
    permission: UserPermissions.ClinicalScheduleSuiteView,
  },
];
