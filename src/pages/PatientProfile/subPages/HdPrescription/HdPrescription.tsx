import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { GlobalAddButton, GlobalLoader } from '@components';
import { useAppDispatch } from '@hooks/storeHooks';
import { HdPrescriptionsTable } from '@components/pages/PatientProfile';
import {
  addDrawer,
  addServiceModal,
  clearHdPrescriptionFormData,
  getHdPrescriptionsList,
  getPatientClinicalInfo,
  getPatientIsolationStatus,
  getShiftDictionary,
  selectClinicalInfo,
  selectHasActiveDrawers,
  selectHdPrescriptionFileLoading,
  selectPatientIsolationStatus,
  selectPatientStatus,
  selectUserPermissions,
} from '@store';
import { PermissionGuard } from '@guards';
import { ROUTES } from '@constants';
import { DrawerType, PatientStatuses, ServiceModalName, UserPermissions } from '@enums';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export const HdPrescription = () => {
  const { t } = useTranslation('common');
  const { t: tHdPrescription } = useTranslation('hdPrescription');
  const userPermissions = selectUserPermissions();
  const { id } = useParams();
  const isFileLoading = selectHdPrescriptionFileLoading();
  const dispatch = useAppDispatch();
  const hasActiveDrawers = selectHasActiveDrawers();
  const patientStatus = selectPatientStatus();
  const clinicalInfo = selectClinicalInfo();
  const patientIsolationStatus = selectPatientIsolationStatus();

  const isShowAddButton =
    userPermissions.includes(UserPermissions.DialysisAddPrescription) &&
    !hasActiveDrawers &&
    patientStatus &&
    patientIsolationStatus !== undefined;
  const isUnavailableStatus =
    patientStatus === PatientStatuses.Walk_In ||
    patientStatus === PatientStatuses.Dead ||
    patientStatus === PatientStatuses.Discharged;

  useEffect(() => {
    if (id) {
      dispatch(getShiftDictionary());
      dispatch(getHdPrescriptionsList(id));
      dispatch(getPatientClinicalInfo(id));
      dispatch(getPatientIsolationStatus(id));
    }
  }, [id]);

  const openDrawer = () => {
    if (patientIsolationStatus === null) {
      dispatch(
        addServiceModal({
          name: ServiceModalName.ConfirmModal,
          payload: {
            cancelButton: null,
            confirmButton: t('button.ok'),
            title: tHdPrescription('modals.isolationStatus.title'),
            text: null,
          },
        }),
      );
    } else {
      if (clinicalInfo?.virology) {
        dispatch(clearHdPrescriptionFormData());
        dispatch(
          addDrawer({
            type: DrawerType.HdPrescriptionForm,
            payload: { id },
            allowedPathsToShowDrawer: [ROUTES.patientsOverview],
          }),
        );
      } else {
        dispatch(
          addServiceModal({
            name: ServiceModalName.ConfirmModal,
            payload: {
              cancelButton: null,
              confirmButton: t('button.ok'),
              title: t('isolationUnknown'),
              text: t('noMachinesForThisStatus'),
            },
          }),
        );
      }
    }
  };

  return (
    <>
      {isFileLoading && <GlobalLoader />}
      {isShowAddButton && isUnavailableStatus && (
        <Tooltip title={t('unavailableForPatients')} enterTouchDelay={0}>
          <Box
            component="span"
            sx={({ spacing }) => ({
              position: 'fixed',
              right: spacing(3),
              bottom: spacing(3.125),
            })}
          >
            <GlobalAddButton isDisabled onClick={openDrawer} />
          </Box>
        </Tooltip>
      )}
      {isShowAddButton && !isUnavailableStatus && <GlobalAddButton onClick={openDrawer} />}
      <Stack
        direction="column"
        sx={(theme) => ({
          width: 1,
          height: 1,
          p: 0,
          backgroundColor: theme.palette.surface.default,
        })}
        spacing={3}
      >
        <PermissionGuard permissions={[UserPermissions.DialysisViewPrescriptions]}>
          <HdPrescriptionsTable />
        </PermissionGuard>
      </Stack>
    </>
  );
};
