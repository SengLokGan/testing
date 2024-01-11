import i18n from 'i18next';
import { UserPermissions, ViewPermissions } from '@enums';
import { ROUTES } from '@src/constants';

export const administrationPages = () => {
  return [
    {
      name: i18n.t('administration:staffManagement'),
      options: [
        {
          value: i18n.t('administration:usersManagement'),
          link: `/${ROUTES.administration}/${ROUTES.userManagement}`,
          permission: UserPermissions.ViewAdministrationUsersList,
          active: MODULE_USER_MANAGEMENT_ACTIVE,
        },
        {
          value: i18n.t('administration:staffManagement'),
          link: `/${ROUTES.administration}/${ROUTES.staffManagement}`,
          permission: UserPermissions.ViewAdministrationStaffList,
        },
      ],
      accessPermissions: [ViewPermissions.ViewAdministrationStaffManagement],
    },
    {
      name: i18n.t('administration:dialysisMachinesManagement'),
      options: [
        {
          value: i18n.t('administration:dialysisMachines'),
          link: `/${ROUTES.administration}/${ROUTES.dialysisMachines}`,
          permission: UserPermissions.ViewAdministrationMachinesManagement,
        },
      ],
      accessPermissions: [ViewPermissions.ViewAdministrationMachinesManagement],
    },
  ];
};
