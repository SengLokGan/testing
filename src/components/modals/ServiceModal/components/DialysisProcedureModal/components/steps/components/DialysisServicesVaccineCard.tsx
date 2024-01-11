import {
  addServiceModal,
  selectDialysisAppointmentId,
  selectDialysisPatient,
  selectDialysisSkipInfo,
  selectIsDisableInterface,
  selectServiceModal,
  selectUserId,
  selectVaccinesService,
} from '@store/slices';
import { useTranslation } from 'react-i18next';
import DialysisServiceCard from '../../DialysisServiceCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { capitalizeFirstLetter, getCodeValueFromCatalog, toAmPmTimeString } from '@utils';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import {
  AppointmentEventPlace,
  PatientStatuses,
  ServiceModalName,
  UserPermissions,
  VaccinationMedicationAdministeringStatus,
  VaccinationMedicationModalType,
  VaccinationStatus,
} from '@enums';
import Button from '@mui/material/Button';
import { useAppDispatch } from '@hooks/storeHooks';
import { DialysisVaccinationResponse } from '@src/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import theme from '../../../../../../../../styles/theme';
import Divider from '@mui/material/Divider';
import { PermissionGuard } from '@guards';
import { DataRow } from '@components/DataRow/DataRow';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { ServicesType } from '@enums/components/ServicesType';

export const DialysisServicesVaccineCard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('dialysis');
  const { t: tVaccination } = useTranslation('vaccination');
  const { t: tCommon } = useTranslation('common');
  const vaccines = selectVaccinesService() || [];
  const skipInfo = selectDialysisSkipInfo();
  const appointmentId = selectDialysisAppointmentId();
  const userId = selectUserId();
  const { patientId } = selectServiceModal(ServiceModalName.DialysisProcedureModal);
  const isDisabledInterface = selectIsDisableInterface();
  const patient = selectDialysisPatient();

  const isUnavailableStatus =
    patient?.status === PatientStatuses.Walk_In ||
    patient?.status === PatientStatuses.Dead ||
    patient?.status === PatientStatuses.Discharged;

  const openVaccineMedicationAdministeringModal = (
    vaccine,
    status: VaccinationMedicationAdministeringStatus,
    mode?: VaccinationMedicationModalType,
  ) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.VaccineMedicationAdministeringModal,
        payload: {
          patientId,
          vaccine,
          status,
          mode,
        },
      }),
    );
  };

  const openRescheduleModal = (vaccineId: number) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.RescheduleModal,
        payload: {
          appointmentId,
          activeService: { id: vaccineId, type: ServicesType.Vaccine },
          place: AppointmentEventPlace.Services,
        },
      }),
    );
  };

  const checkOnShowActionButtons = (status: VaccinationStatus): boolean => {
    const notSuitableStatuses = [VaccinationStatus.AdministeredInternal, VaccinationStatus.Omitted];
    return !isDisabledInterface && !skipInfo?.skipReason && !notSuitableStatuses.includes(status);
  };

  if (!vaccines.length) {
    return null;
  }

  return (
    <DialysisServiceCard title={tVaccination('tableView.vaccination')}>
      <Stack alignItems="flex-start">
        {vaccines.map((vaccine: DialysisVaccinationResponse) => (
          <Card
            key={vaccine.id}
            data-testid={`vaccine${vaccine.id}`}
            sx={({ spacing, palette }) => ({
              mb: 2,
              width: 1,
              bgcolor:
                vaccine.status === VaccinationStatus.Omitted ||
                vaccine.status === VaccinationStatus.AdministeredInternal
                  ? `${palette.background.default} !important`
                  : '#E9F0F6 !important',
              border: `solid 1px ${palette.border.default}`,
              borderRadius: `${spacing(1.5)} !important`,
            })}
          >
            <Stack
              direction="row"
              alignItems={vaccine.status === VaccinationStatus.AdministeredInternal ? 'center' : 'flex-start'}
              justifyContent="space-between"
              sx={{
                p: ({ spacing }) => spacing(2, 3),
              }}
            >
              <Stack direction="column">
                <Typography variant="labelL" sx={{ maxWidth: (theme) => theme.spacing(30.5) }}>
                  {capitalizeFirstLetter(vaccine.vaccineType.name)}
                </Typography>
                {vaccine.status === VaccinationStatus.NotDone && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <VaccinesOutlinedIcon sx={({ palette }) => ({ fill: palette.error.main })} />
                    <Typography variant="labelM" sx={({ palette }) => ({ color: palette.text.darker })}>
                      {tVaccination(`statuses.${vaccine.status}`)}
                    </Typography>
                  </Stack>
                )}
              </Stack>
              {checkOnShowActionButtons(vaccine.status) && (
                <PermissionGuard permissions={UserPermissions.DialysisAddMeasurement}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
                      <span>
                        <Button
                          variant="text"
                          size="large"
                          disabled={isUnavailableStatus}
                          onClick={() => openRescheduleModal(vaccine.id)}
                        >
                          {tVaccination('service.reschedule')}
                        </Button>
                      </span>
                    </Tooltip>
                    <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
                      <span>
                        <Button
                          variant="text"
                          size="large"
                          disabled={isUnavailableStatus}
                          onClick={() =>
                            openVaccineMedicationAdministeringModal(
                              vaccine,
                              VaccinationMedicationAdministeringStatus.Omit,
                            )
                          }
                        >
                          {tVaccination('service.omit')}
                        </Button>
                      </span>
                    </Tooltip>
                    <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
                      <span>
                        <Button
                          variant="outlined"
                          size="large"
                          disabled={isUnavailableStatus}
                          onClick={() =>
                            openVaccineMedicationAdministeringModal(
                              vaccine,
                              VaccinationMedicationAdministeringStatus.Administering,
                            )
                          }
                        >
                          {tVaccination('service.administer')}
                        </Button>
                      </span>
                    </Tooltip>
                  </Stack>
                </PermissionGuard>
              )}
              {skipInfo?.skipComment && (
                <Stack direction="row" spacing={0.5}>
                  <CancelIcon sx={{ fill: ({ palette }) => palette.error.main }} />
                  <Typography variant="labelM">{t('skipped')}</Typography>
                </Stack>
              )}
              {vaccine.status === VaccinationStatus.AdministeredInternal && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon sx={{ fill: '#006D3C' }} />
                  <Typography variant="paragraphM">{tVaccination(`statuses.${vaccine.status}`)}</Typography>
                </Stack>
              )}
              {vaccine.status === VaccinationStatus.Omitted && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CancelIcon sx={{ fill: (theme) => theme.palette.error.main }} />
                  <Typography variant="paragraphM">{tVaccination(`statuses.${vaccine.status}`)}</Typography>
                </Stack>
              )}
            </Stack>
            <Divider sx={{ bgcolor: '#DFE3E9' }} />
            <Stack direction="row">
              <Stack direction="column" sx={{ px: 3, py: 2, flex: 1 }}>
                <DataRow
                  title={tVaccination('tableView.amount')}
                  titleColor={theme.palette.text.darker}
                  value={vaccine?.amount}
                  sx={{ mb: 1 }}
                />
                <DataRow
                  title={tVaccination('tableView.dosingSchedule')}
                  titleColor={theme.palette.text.darker}
                  value={getCodeValueFromCatalog('dosingSchedule', vaccine?.dossingSchedule)}
                  sx={{ mb: 1 }}
                />
                {(vaccine.status === VaccinationStatus.AdministeredInternal ||
                  vaccine.status === VaccinationStatus.Omitted) && (
                  <>
                    <DataRow
                      title={tVaccination(
                        `form.${vaccine.status !== VaccinationStatus.Omitted ? 'administeredBy' : 'omittedBy'}`,
                      )}
                      titleColor={theme.palette.text.darker}
                      value={
                        vaccine.status === VaccinationStatus.Omitted
                          ? vaccine?.omittedBy?.name
                          : vaccine?.administeredBy?.name
                      }
                      additionalValue={
                        vaccine.status === VaccinationStatus.AdministeredInternal
                          ? toAmPmTimeString(new Date(vaccine?.administeredAt))
                          : toAmPmTimeString(new Date(vaccine?.omittedAt))
                      }
                      sx={{ mb: 1 }}
                    />
                    {vaccine.editedBy && (
                      <>
                        <DataRow
                          title={tVaccination('tableView.editedBy')}
                          titleColor={theme.palette.text.darker}
                          value={vaccine?.editedBy?.name}
                          additionalValue={toAmPmTimeString(new Date(vaccine?.editedAt))}
                          sx={{ mb: 1 }}
                        />
                      </>
                    )}
                    <DataRow
                      title={tVaccination('form.comments')}
                      titleColor={theme.palette.text.darker}
                      value={vaccine?.comment}
                    />
                  </>
                )}
              </Stack>
              {!isDisabledInterface &&
                !isUnavailableStatus &&
                (vaccine?.administeredBy?.id === userId || vaccine?.omittedBy?.id === userId) &&
                (vaccine.status === VaccinationStatus.AdministeredInternal ||
                  vaccine.status === VaccinationStatus.Omitted) && (
                  <Box sx={{ pt: 1, pr: 2, display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton
                      onClick={() =>
                        openVaccineMedicationAdministeringModal(
                          vaccine,
                          vaccine.status === VaccinationStatus.Omitted
                            ? VaccinationMedicationAdministeringStatus.Omit
                            : VaccinationMedicationAdministeringStatus.Administering,
                          VaccinationMedicationModalType.Editing,
                        )
                      }
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </DialysisServiceCard>
  );
};
