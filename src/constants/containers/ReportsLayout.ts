import i18n from 'i18next';
import { ROUTES } from '@constants';
import { ViewPermissions } from '@enums';

export const groupedReports = () => [
  {
    name: i18n.t('reports:clinical'),
    options: [
      {
        value: i18n.t('reports:vascularAccess'),
        link: `/${ROUTES.reports}/${ROUTES.clinicalReports}/${ROUTES.vascularAccessReport}`,
        permissions: [ViewPermissions.ViewClinicalReports],
      },
      {
        value: i18n.t('reports:injectionHistory'),
        link: `/${ROUTES.reports}/${ROUTES.clinicalReports}/${ROUTES.injectionHistoryReport}`,
        permissions: [ViewPermissions.ViewInjectionHistoryReports],
      },
    ],
    groupAccessPermissions: [ViewPermissions.ViewClinicalReports],
  },
  {
    name: i18n.t('reports:administrative'),
    options: [
      {
        value: i18n.t('reports:patientCensus'),
        link: `/${ROUTES.reports}/${ROUTES.administrativeReports}/${ROUTES.patientCensusReport}`,
        permissions: [ViewPermissions.ViewManagementReports],
      },
      {
        value: i18n.t('reports:mortalityReport'),
        link: `/${ROUTES.reports}/${ROUTES.administrativeReports}/${ROUTES.mortalityReport}`,
        permissions: [ViewPermissions.ViewManagementReports],
      },
      {
        value: i18n.t('reports:hospitalizationReport'),
        link: `/${ROUTES.reports}/${ROUTES.administrativeReports}/${ROUTES.hospitalizationReport}`,
        permissions: [ViewPermissions.ViewManagementReports],
      },
      {
        value: i18n.t('reports:patientStationHistoryReport'),
        link: `/${ROUTES.reports}/${ROUTES.administrativeReports}/${ROUTES.patientStationHistoryReport}`,
        permissions: [ViewPermissions.ViewManagementReports],
      },
    ],
    groupAccessPermissions: [ViewPermissions.ViewManagementReports],
  },
];
