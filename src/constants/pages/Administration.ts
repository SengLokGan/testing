import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import i18n from 'i18next';
import { ROUTES } from '@src/constants';
import { UserPermissions } from '@enums';

export const administrationStaffManagement = () => [
  {
    id: 1,
    title: i18n.t('administration:usersManagement'),
    label: i18n.t('administration:listOfTenantUsers'),
    icon: PersonAddAltIcon,
    link: `/${ROUTES.administration}/${ROUTES.userManagement}`,
    permission: UserPermissions.ViewAdministrationUsersList,
    active: MODULE_USER_MANAGEMENT_ACTIVE,
  },
  {
    id: 2,
    title: i18n.t('administration:staffManagement'),
    label: i18n.t('administration:clinicalStaffList'),
    icon: PeopleAltOutlinedIcon,
    link: `/${ROUTES.administration}/${ROUTES.staffManagement}`,
    permission: UserPermissions.ViewAdministrationStaffList,
  },
];

export const administrationDialysisMachinesManagement = () => [
  {
    id: 1,
    title: i18n.t('administration:dialysisMachines'),
    label: i18n.t('administration:hDMachinesList'),
    icon: SettingsApplicationsOutlinedIcon,
    link: ROUTES.dialysisMachines,
    permission: UserPermissions.ViewAdministrationMachinesManagement,
  },
];
