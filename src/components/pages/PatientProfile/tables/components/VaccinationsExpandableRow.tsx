import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataRow } from '@components/DataRow/DataRow';
import {
  dateFormat,
  getCodeValueFromCatalog,
  getDoctorName,
  getPersonNameWithDeletedSyfix,
  getTenantDate,
} from '@utils';
import { useParams } from 'react-router-dom';
import { capitalize } from '@mui/material';
import theme from '@src/styles/theme';
import type { VaccinationForm, VaccinationResponse, FileDocument } from '@types';
import { FileLink } from '@components/FileLink/FileLink';
import Typography from '@mui/material/Typography';
import { PermissionGuard } from '@guards/PermissionGuard';
import {
  DrawerType,
  ServiceModalName,
  UserPermissions,
  VaccinationDrawerType,
  VaccinationStatus,
  VaccinationType,
} from '@enums';
import Button from '@mui/material/Button';
import { addDrawer, addServiceModal, addVaccinationFormData, deleteVaccination, selectHasActiveDrawers } from '@store';
import { ROUTES } from '@constants';
import { useAppDispatch } from '@hooks/storeHooks';
import uniqid from 'uniqid';
import ErrorIcon from '@mui/icons-material/Error';
import { WarningMessage } from '@src/components';

export type VaccinationsExpandableRowProps = VaccinationResponse;

export const VaccinationsExpandableRow = ({
  prescribedBy: doctor,
  status,
  ...vaccination
}: VaccinationsExpandableRowProps) => {
  const { t } = useTranslation('vaccination');
  const { t: tCommon } = useTranslation('common');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const hasActiveDrawers = selectHasActiveDrawers();

  const openDrawer = () => {
    const data: VaccinationForm = {
      id: vaccination.id,
      status,
      clinic: { label: vaccination?.clinic?.name, value: vaccination?.clinic?.branchId },
      comments: vaccination?.comments[0],
      amount: vaccination?.amount,
      dossingSchedule: vaccination.dossingSchedule,
      administerDate: getTenantDate(new Date(vaccination?.administeredAt ?? vaccination?.dateToAdminister!)),
      files: vaccination?.files,
      prescriptionDate: vaccination?.prescriptionDate
        ? getTenantDate(new Date(vaccination?.prescriptionDate))
        : undefined,
      doctorsSpecialitySelect: doctor?.internalDoctorId,
      doctorsSpecialityText: doctor?.speciality,
      type:
        status === VaccinationStatus.AdministeredInternal ? VaccinationType.Administered : VaccinationType.ToAdminister,
      prescribedBy: doctor?.name ? { label: doctor?.name, value: doctor.internalDoctorId } : undefined,
      vaccineType: vaccination.vaccineType?.code
        ? { label: vaccination.vaccineType.name, value: vaccination.vaccineType.code }
        : undefined,
      administeredVaccineType: vaccination.vaccineType?.code ? undefined : vaccination.vaccineType.name,
    };
    dispatch(addVaccinationFormData(data));
    dispatch(
      addDrawer({
        type: DrawerType.VaccinationForm,
        payload: { id, type: VaccinationDrawerType.Edit, status },
        allowedPathsToShowDrawer: [ROUTES.patientsOverview],
      }),
    );
  };

  const handleDeleteVaccination = () => {
    if (id) {
      dispatch(deleteVaccination({ vaccinationId: vaccination.id, id, status }));
    }
  };

  const isOverDueDate = (value): boolean => {
    const yesterday = new Date().setDate(new Date().getDate() - 1);
    return getTenantDate(new Date(yesterday)) >= getTenantDate(value);
  };

  return (
    <>
      <Box sx={(theme) => ({ p: theme.spacing(1, 1, 2, 0) })}>
        <Stack direction="row" spacing={1}>
          <PermissionGuard permissions={UserPermissions.VaccinationModify}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => openDrawer()}
              disabled={
                hasActiveDrawers ||
                status === VaccinationStatus.Omitted ||
                status === VaccinationStatus.AdministeredInternal
              }
              data-testid="editVaccinationButton"
            >
              {tCommon('button.edit')}
            </Button>
          </PermissionGuard>
          <PermissionGuard permissions={UserPermissions.VaccinationDelete}>
            <Button
              variant="contained"
              size="medium"
              onClick={() =>
                dispatch(
                  addServiceModal({
                    name: ServiceModalName.ConfirmModal,
                    payload: {
                      closeCallback: handleDeleteVaccination,
                      title: t('youWantToDeleteTheVaccine'),
                      text: t('dataWillBeLost'),
                      confirmButton: tCommon('button.delete'),
                      cancelButton: tCommon('button.cancel'),
                    },
                  }),
                )
              }
              disabled={
                hasActiveDrawers ||
                status === VaccinationStatus.Omitted ||
                status === VaccinationStatus.NotDone ||
                status === VaccinationStatus.AdministeredInternal
              }
              data-testid="deleteVaccinationButton"
            >
              {tCommon('button.delete')}
            </Button>
          </PermissionGuard>
        </Stack>
        {(status === VaccinationStatus.Omitted || status === VaccinationStatus.AdministeredInternal) && (
          <WarningMessage
            text={t(
              `tableView.${
                status === VaccinationStatus.Omitted ? 'vaccineHasBeenOmitted' : 'vaccineHasBeenAdministered'
              }`,
            )}
          />
        )}
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={12} md={8} lg={6}>
            <DataRow
              title={t('tableView.vaccineType')}
              titleColor={theme.palette.text.darker}
              value={
                vaccination?.vaccineType?.code
                  ? getCodeValueFromCatalog('vaccines', vaccination.vaccineType.code.toString())
                  : vaccination?.vaccineType?.name
              }
            />
            <DataRow title={t('tableView.amount')} titleColor={theme.palette.text.darker} value={vaccination?.amount} />
            <DataRow
              title={t('tableView.dosingSchedule')}
              titleColor={theme.palette.text.darker}
              value={getCodeValueFromCatalog('dosingSchedule', vaccination.dossingSchedule)}
            />
            <DataRow
              title={t('tableView.dateToAdminister')}
              titleColor={theme.palette.text.darker}
              value={
                status === VaccinationStatus.NotDone && isOverDueDate(vaccination?.dateToAdminister) ? (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <ErrorIcon
                      sx={{ color: (theme) => theme.palette.error.main, width: (theme) => theme.spacing(2) }}
                    />
                    <Typography variant="labelM" sx={{ color: (theme) => theme.palette.error.main }}>
                      {dateFormat(vaccination?.dateToAdminister)}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography variant="labelM">
                    {vaccination?.dateToAdminister ? dateFormat(vaccination.dateToAdminister) : '—'}
                  </Typography>
                )
              }
            />
            <DataRow
              title={t('tableView.clinic')}
              titleColor={theme.palette.text.darker}
              value={vaccination.clinic?.name}
            />
            <DataRow
              title={t('tableView.prescribedBy')}
              titleColor={theme.palette.text.darker}
              value={capitalize(getDoctorName(doctor))}
              additionalValue={dateFormat(vaccination.prescriptionDate)}
            />
            <DataRow
              title={t('tableView.enteredBy')}
              titleColor={theme.palette.text.darker}
              value={getPersonNameWithDeletedSyfix(vaccination.enteredBy)}
              additionalValue={dateFormat(vaccination.enteredAt)}
            />
            <DataRow
              title={t('tableView.editedBy')}
              titleColor={theme.palette.text.darker}
              value={getPersonNameWithDeletedSyfix(vaccination.editedBy)}
              additionalValue={dateFormat(vaccination.editedAt)}
            />
            {!vaccination?.omittedAt && (
              <DataRow
                title={t('tableView.administeredBy')}
                titleColor={theme.palette.text.darker}
                value={getPersonNameWithDeletedSyfix(vaccination.administeredBy)}
                additionalValue={dateFormat(
                  vaccination?.administeredAt || '',
                  status === VaccinationStatus.AdministeredExternal ? 'dd/MM/yyyy' : 'dd/MM/yyyy hh:mm a',
                )}
              />
            )}
            {vaccination?.omittedAt && (
              <DataRow
                title={t('form.omittedBy')}
                titleColor={theme.palette.text.darker}
                value={getPersonNameWithDeletedSyfix(vaccination?.omittedBy)}
                additionalValue={dateFormat(vaccination.omittedAt, 'dd/MM/yyyy')}
              />
            )}
            <DataRow
              title={t('tableView.comments')}
              titleColor={theme.palette.text.darker}
              value={
                vaccination?.comments.length > 0
                  ? vaccination?.comments?.map((comment) => (
                      <Typography key={uniqid()} variant="labelM">
                        {comment}
                      </Typography>
                    ))
                  : '—'
              }
            />
            {(vaccination.files && status !== VaccinationStatus.AdministeredExternal) ||
              (vaccination.files && status !== VaccinationStatus.AdministeredInternal && (
                <DataRow
                  title={t('tableView.uploadedFiles')}
                  titleColor={theme.palette.text.darker}
                  value={
                    <Stack direction="column" spacing={2} sx={{ width: 1, maxWidth: ({ spacing }) => spacing(42.5) }}>
                      {vaccination.files.length > 0 ? (
                        vaccination.files.map((file: FileDocument) => (
                          <FileLink patientId={id} key={file.id} file={file} withSize={false} />
                        ))
                      ) : (
                        <Typography variant="labelM">—</Typography>
                      )}
                    </Stack>
                  }
                />
              ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
