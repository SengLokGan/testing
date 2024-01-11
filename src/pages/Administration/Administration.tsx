import { StackBlock } from '@components';
import { administrationDialysisMachinesManagement, administrationStaffManagement } from '@constants';
import { IconColors, UserPermissions } from '@enums';
import { PermissionGuard } from '@guards';
import { Stack } from '@mui/material';
import { selectUserPermissions } from '@store/slices';
import { useTranslation } from 'react-i18next';

export const Administration = () => {
  const { t } = useTranslation('administration');
  const userPermissions = selectUserPermissions();
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={2}
      sx={({ spacing }) => ({ width: 1, padding: spacing(0, 3) })}
    >
      <PermissionGuard
        exact={false}
        permissions={[UserPermissions.ViewAdministrationStaffManagement, UserPermissions.ViewAdministrationUsersList]}
      >
        <StackBlock title={t('staffManagement')} cards={administrationStaffManagement()} />
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.ViewAdministrationMachinesManagement}>
        <StackBlock
          title={t('dialysisMachinesManagement')}
          cards={administrationDialysisMachinesManagement().filter((card) =>
            userPermissions.includes(card?.permission),
          )}
          iconColor={IconColors.yellow}
        />
      </PermissionGuard>
    </Stack>
  );
};
