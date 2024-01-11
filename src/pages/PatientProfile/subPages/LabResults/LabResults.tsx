import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAppDispatch } from '@hooks/storeHooks';
import { PermissionGuard } from '@guards';
import { GlobalAddButtonWithChips, GlobalLoader } from '@components';
import {
  DrawerType,
  FormType,
  LabOrderEventPlace,
  LabOrdersTabs,
  LabOrderStatus,
  LabOrderType,
  LabSpecimenType,
  LabTestTypes,
  PatientStatuses,
  ServiceModalName,
  UserPermissions,
} from '@enums';
import {
  addDrawer,
  addServiceModal,
  selectHasActiveDrawers,
  selectHasServiceModal,
  selectLabOrdersIsFileLoading,
  selectLabResultsIsFileLoading,
  selectPatient,
  selectUserPermissions,
} from '@store';
import { LabOrders, LabSummary } from '@components/pages/PatientProfile/subPages';
import Typography from '@mui/material/Typography';
import { ROUTES } from '@constants';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export const LabResults = () => {
  const [tabName, setTabName] = useState<LabOrdersTabs>(LabOrdersTabs.Summary);
  const dispatch = useAppDispatch();
  const isServiceModalOpened = selectHasServiceModal();
  const hasActiveDrawers = selectHasActiveDrawers();
  const patient = selectPatient();
  const { t } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const userPermissions = selectUserPermissions();
  const isLabResultFileLoading = selectLabResultsIsFileLoading();
  const isLabOrderFileLoading = selectLabOrdersIsFileLoading();

  const handleChangeTab = (event, tabName) => setTabName(tabName);

  const isShowAddButton = !hasActiveDrawers && patient?.status && !isServiceModalOpened;
  const isUnavailableStatus =
    patient?.status === PatientStatuses.Walk_In ||
    patient?.status === PatientStatuses.Dead ||
    patient?.status === PatientStatuses.Discharged;

  const openDrawer = (labTestType: LabOrderType) => {
    const setFormInitValues = () => {
      switch (labTestType) {
        case LabOrderType.INDIVIDUAL:
          return {
            patient: { label: patient?.name, value: patient?.id },
            procedure: null,
            laboratory: null,
            specimenType: LabSpecimenType.BLOOD,
            dialysisDay: true,
            planeDates: [{ date: null, status: LabOrderStatus.TO_PERFORM }],
          };
        case LabOrderType.QUARTERLY:
          return {
            patient: { label: patient?.name, value: patient?.id },
            firstQuarterProcedure: null,
            secondQuarterProcedure: null,
            thirdQuarterProcedure: null,
            fourthQuarterProcedure: null,
          };
        case LabOrderType.URGENT:
          return {
            patient: { label: patient?.name, value: patient?.id },
            procedure: null,
            laboratory: null,
            specimenType: LabSpecimenType.BLOOD,
          };
        default:
          return null;
      }
    };

    dispatch(
      labTestType === LabOrderType.URGENT
        ? addServiceModal({
            name: ServiceModalName.UrgentLabTest,
            payload: {
              place: LabOrderEventPlace.LabResults,
              mode: FormType.Add,
              disabledPatient: true,
              formInitialValues: setFormInitValues(),
            },
          })
        : addDrawer({
            type:
              labTestType === LabOrderType.INDIVIDUAL ? DrawerType.IndividualLabTestPlanForm : DrawerType.QuarterlyBT,
            payload: {
              place: LabOrderEventPlace.LabResults,
              mode: FormType.Add,
              disabledPatient: true,
              formInitialValues: setFormInitValues(),
            },
            allowedPathsToShowDrawer: [ROUTES.patientsOverview],
          }),
    );
  };

  useEffect(() => {
    if (
      !userPermissions.includes(UserPermissions.AnalysesViewResults) &&
      userPermissions.includes(UserPermissions.AnalysesViewOrders)
    ) {
      setTabName(LabOrdersTabs.Orders);
    }
  }, []);

  return (
    <>
      {(isLabResultFileLoading || isLabOrderFileLoading) && <GlobalLoader />}
      {isShowAddButton && tabName === LabOrdersTabs.Orders && !isUnavailableStatus && (
        <PermissionGuard permissions={[UserPermissions.AnalysesModifyOrder]}>
          <GlobalAddButtonWithChips
            chips={[
              { label: t(`labTestTypes.${LabTestTypes.IndividualLab}`), value: LabTestTypes.IndividualLab },
              { label: t(`labTestTypes.${LabTestTypes.QuarterlyBT}`), value: LabTestTypes.QuarterlyBT },
              { label: t(`labTestTypes.${LabTestTypes.UrgentLabTest}`), value: LabTestTypes.UrgentLabTest },
            ]}
            onChipClick={(value) => openDrawer(value as LabOrderType)}
          />
        </PermissionGuard>
      )}
      {isShowAddButton && tabName === LabOrdersTabs.Orders && isUnavailableStatus && (
        <Tooltip title={tCommon('unavailableForPatients')} enterTouchDelay={0}>
          <Box
            component="span"
            sx={({ spacing }) => ({
              position: 'fixed',
              right: spacing(3),
              bottom: spacing(3.125),
            })}
          >
            <GlobalAddButtonWithChips disabled chips={[]} onChipClick={() => {}} />
          </Box>
        </Tooltip>
      )}
      <Stack
        direction="column"
        sx={{ width: 1, height: 1, p: 0, backgroundColor: (theme) => theme.palette.surface.default }}
      >
        <Tabs
          value={tabName}
          onChange={handleChangeTab}
          TabIndicatorProps={{ sx: { height: (theme) => theme.spacing(0.375) } }}
          sx={{
            px: 1.5,
            flexShrink: 0,
            borderBottom: (theme) => `solid 1px ${theme.palette.border.default}`,
            '& .MuiButtonBase-root': {
              textTransform: 'unset',
            },
          }}
        >
          <Tab label={<Typography variant="labelM">{t('labSummary')}</Typography>} value={LabOrdersTabs.Summary} />
          {userPermissions.includes(UserPermissions.AnalysesViewOrders) && (
            <Tab
              label={<Typography variant="labelM">{t('labOrders')}</Typography>}
              value={LabOrdersTabs.Orders}
              sx={{ minWidth: 'max-content' }}
            />
          )}
        </Tabs>
        {tabName === LabOrdersTabs.Summary ? <LabSummary /> : <LabOrders />}
      </Stack>
    </>
  );
};
