import Stack from '@mui/material/Stack';
import { StackBlock } from '@components/StackBlock/StackBlock';
import { useTranslation } from 'react-i18next';
import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import { IconColors, UserPermissions } from '@enums';
import { ROUTES } from '@constants';
import { PermissionGuard } from '@guards';
import { HomeHealthIcon } from '@assets/icons';

export const Reports = () => {
  const { t } = useTranslation('reports');

  const clinicalReports = [
    {
      id: 1,
      title: t('vascularAccess'),
      icon: SwapVerticalCircleOutlinedIcon,
      link: `${ROUTES.clinicalReports}/${ROUTES.vascularAccessReport}`,
      permission: UserPermissions.ViewClinicalReports,
    },
    {
      id: 2,
      title: t('injectionHistory'),
      icon: VaccinesOutlinedIcon,
      link: `${ROUTES.clinicalReports}/${ROUTES.injectionHistoryReport}`,
      permission: UserPermissions.ViewInjectionHistoryReports,
    },
  ];

  const administrativeReports = [
    {
      id: 1,
      title: t('patientCensus'),
      icon: PeopleAltOutlinedIcon,
      link: `${ROUTES.administrativeReports}/${ROUTES.patientCensusReport}`,
      permission: UserPermissions.ViewManagementReports,
    },
    {
      id: 2,
      title: t('hospitalizationReport'),
      icon: HomeHealthIcon,
      link: `${ROUTES.administrativeReports}/${ROUTES.hospitalizationReport}`,
      permission: UserPermissions.ViewManagementReports,
    },
    {
      id: 3,
      title: t('mortalityReport'),
      icon: PlaylistRemoveIcon,
      link: `${ROUTES.administrativeReports}/${ROUTES.mortalityReport}`,
      permission: UserPermissions.ViewManagementReports,
    },
    {
      id: 4,
      title: t('patientStationHistoryReport'),
      icon: SettingsApplicationsOutlinedIcon,
      link: `${ROUTES.administrativeReports}/${ROUTES.patientStationHistoryReport}`,
      permission: UserPermissions.ViewManagementReports,
    },
  ];

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={2}
      sx={({ spacing }) => ({ width: 1, padding: spacing(0, 3) })}
    >
      <PermissionGuard permissions={UserPermissions.ViewClinicalReports}>
        <StackBlock title={t('clinical')} cards={clinicalReports} />
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.ViewManagementReports}>
        <StackBlock title={t('administrative')} cards={administrativeReports} iconColor={IconColors.yellow} />
      </PermissionGuard>
    </Stack>
  );
};
