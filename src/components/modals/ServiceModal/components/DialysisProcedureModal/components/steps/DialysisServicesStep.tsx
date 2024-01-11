import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import {
  clearInitialDialysisData,
  closeDialysisModal,
  reactivateAppointment,
  selectDialysisAppointmentId,
  selectDialysisIsFutureAppointment,
  selectDialysisLoading,
  selectDialysisPatient,
  selectDialysisSkipInfo,
  selectWithDialysis,
} from '@store/slices/dialysisSlice';
import { addServiceModal, removeServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@hooks/storeHooks';
import { DialysisServicesLaboratoryCard } from './components/DialysisServicesLaboratoryCard';
import { AppointmentEventPlace, PatientStatuses, ServiceModalName, UserPermissions } from '@enums';
import { DialysisServicesPrescriptionCard } from './components/DialysisServicesPrescriptionCard';
import { DialysisServicesMedicationCard } from './components/DialysisServicesMedicationCard';
import { Event } from '@services/Event/Event';
import { DialysisServicesVaccineCard } from './components/DialysisServicesVaccineCard';
import { selectLabOrdersIsFileLoading } from '@store/slices';
import { GlobalLoader } from '@components/GlobalLoader/GlobalLoader';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataRow } from '@components/DataRow';
import CancelIcon from '@mui/icons-material/Cancel';
import { theme } from '@src/styles';
import { Spacing } from '@mui/system/createTheme/createSpacing';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';
import { dateFormat, toAmPmTimeString } from '@utils/dateFormat';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import { PermissionGuard } from '@guards/PermissionGuard';
import { getPersonNameWithDeletedSyfix } from '@utils/getPersonNameWithDeletedSyfix';
import { ServicesType } from '@enums/components/ServicesType';
import { API } from '@utils/api';

export const DialysisServicesStep = () => {
  const { t } = useTranslation('dialysis');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const skipInfo = selectDialysisSkipInfo();
  const loading = selectDialysisLoading();
  const appointmentId = selectDialysisAppointmentId();
  const isFutureAppointment = selectDialysisIsFutureAppointment();
  const isFileLoading = selectLabOrdersIsFileLoading();
  const [reactivateAvailability, setReactivateAvailability] = useState(false);
  const patient = selectDialysisPatient();
  const withDialysis = selectWithDialysis();

  const isUnavailableStatus =
    patient?.status === PatientStatuses.Walk_In ||
    patient?.status === PatientStatuses.Dead ||
    patient?.status === PatientStatuses.Discharged;

  useEffect(() => {
    const onCloseDialysisModal = () => {
      dispatch(clearInitialDialysisData());
      dispatch(removeServiceModal(ServiceModalName.DialysisProcedureModal));
    };
    Event.subscribe(closeDialysisModal.type, onCloseDialysisModal);
    return () => Event.unsubscribe(closeDialysisModal.type, onCloseDialysisModal);
  }, []);

  const openSkipAppointmentModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.SkipAppointmentModal,
        payload: {
          appointmentId,
          skipInfo,
          previousSkipped: skipInfo?.previousSkipped,
          reason: skipInfo?.skipReason,
          skipPlace: AppointmentEventPlace.Services,
        },
      }),
    );
  };

  const openRescheduleAppointmentModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.RescheduleModal,
        payload: {
          appointmentId,
          activeService: { type: ServicesType.Hemodialysis },
          place: AppointmentEventPlace.Services,
        },
      }),
    );
  };
  const openReactivateAppointmentModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => {
            dispatch(reactivateAppointment(appointmentId));
          },
          title: t('modal.areYouSureReactivateAppointment'),
          text: '',
          confirmButton: tCommon('button.reactivate'),
        },
      }),
    );
  };

  useEffect(() => {
    API.get(`pm/appointments/${appointmentId}/reactivation/available`)
      .then(({ data }) => {
        setReactivateAvailability(data.available);
      })
      .catch((error) => console.error(error));
  }, [appointmentId]);

  const getDataRowStyles = (spacing: Spacing, data?: any) => ({
    maxWidth: spacing(87),
    width: 1,
    mt: `${spacing(0)} !important`,
    '& .MuiPaper-root': { maxWidth: spacing(22.5) },
    ...data,
  });

  return (
    <>
      {(isFileLoading || loading) && <GlobalLoader />}
      <Stack direction="column" data-testid="dialysisServicesStep" sx={{ py: 2 }}>
        <Stack direction="column" spacing={2} alignItems="center">
          {!loading && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width={1}
              sx={{ maxWidth: (theme) => theme.spacing(87) }}
            >
              <Typography variant="headerL">{t('appointmentServices')}</Typography>
              {withDialysis && (
                <Stack direction="row" spacing={2}>
                  {skipInfo?.skipComment && reactivateAvailability && (
                    <PermissionGuard permissions={[UserPermissions.DialysisReactivateAppointment]}>
                      <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
                        <span>
                          <Button
                            variant="outlined"
                            disabled={isUnavailableStatus}
                            size="large"
                            onClick={openReactivateAppointmentModal}
                          >
                            {t('reactivate')}
                          </Button>
                        </span>
                      </Tooltip>
                    </PermissionGuard>
                  )}
                  {!skipInfo?.skipComment && !skipInfo?.hasEncounter && (
                    <>
                      <PermissionGuard permissions={[UserPermissions.DialysisRescheduleAppointment]}>
                        <Tooltip
                          title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''}
                          enterTouchDelay={0}
                        >
                          <span>
                            <Button
                              variant="outlined"
                              disabled={isUnavailableStatus}
                              size="large"
                              onClick={openRescheduleAppointmentModal}
                            >
                              {t('reschedule')}
                            </Button>
                          </span>
                        </Tooltip>
                      </PermissionGuard>
                      <PermissionGuard permissions={[UserPermissions.DialysisDeleteAppointment]}>
                        <Button variant="outlined" size="large" onClick={openSkipAppointmentModal}>
                          {t('skipAppointment')}
                        </Button>
                      </PermissionGuard>
                    </>
                  )}
                </Stack>
              )}
            </Box>
          )}
          {!loading && skipInfo?.skipReason && withDialysis && (
            <>
              <DataRow
                title={t('appointmentStatus')}
                value={
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CancelIcon sx={{ fill: ({ palette }) => palette.error.main }} />
                    <Typography variant="labelM">{t('skipped')}</Typography>
                    <IconButton
                      onClick={openSkipAppointmentModal}
                      sx={{ p: 0, '&:hover': { backgroundColor: 'unset' } }}
                    >
                      <EditOutlinedIcon sx={{ ml: 1 }} />
                    </IconButton>
                  </Stack>
                }
                titleColor={theme.palette.text.darker}
                sx={({ spacing }) => getDataRowStyles(spacing, { mt: `${spacing(2)} !important` })}
              />
              <DataRow
                title={t('reasonForSkipping')}
                value={skipInfo?.skipReason ? getCodeValueFromCatalog('skippingReasons', skipInfo.skipReason) : null}
                skipEmpty
                titleColor={theme.palette.text.darker}
                sx={({ spacing }) => getDataRowStyles(spacing)}
              />
              <DataRow
                title={t('skippedBy')}
                value={getPersonNameWithDeletedSyfix(skipInfo?.skippedBy)}
                additionalValue={`${dateFormat(skipInfo?.skippedAt)} ${toAmPmTimeString(
                  new Date(skipInfo?.skippedAt),
                )}`}
                skipEmpty
                titleColor={theme.palette.text.darker}
                sx={({ spacing }) => getDataRowStyles(spacing)}
              />
              <DataRow
                title={t('editedBy')}
                value={getPersonNameWithDeletedSyfix(skipInfo?.editedBy)}
                additionalValue={`${dateFormat(skipInfo?.editedAt)} ${toAmPmTimeString(new Date(skipInfo?.editedAt))}`}
                skipEmpty
                titleColor={theme.palette.text.darker}
                sx={({ spacing }) => getDataRowStyles(spacing)}
              />
              <DataRow
                title={t('comments')}
                value={skipInfo?.skipComment}
                titleColor={theme.palette.text.darker}
                skipEmpty
                sx={({ spacing }) => getDataRowStyles(spacing)}
              />
            </>
          )}
          <DialysisServicesPrescriptionCard />
          <DialysisServicesMedicationCard />
          <DialysisServicesVaccineCard />
          <DialysisServicesLaboratoryCard />
        </Stack>
      </Stack>
    </>
  );
};

export default DialysisServicesStep;
