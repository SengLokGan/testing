import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import type { HdPrescription, MedicationForm, MedicationResponse } from '@types';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataRow } from '@components/DataRow/DataRow';
import { WarningMessage } from '@components';
import {
  API,
  capitalizeFirstLetter,
  dateFormat,
  Dictionaries,
  getCodeValueFromCatalog,
  getDoctorName,
  getPersonNameWithDeletedSyfix,
} from '@utils';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import { capitalize } from '@mui/material';
import { PermissionGuard } from '@guards';
import { AxiosResponse } from 'axios';
import {
  addDrawer,
  addMedicationFormData,
  addServiceModal,
  clearMedicationSaveSuccessState,
  deleteMedication,
  selectHasActiveDrawers,
  selectMedicationSaveDataSuccess,
  selectPatientStatus,
  selectUserId,
  selectUserPermissions,
} from '@store';
import {
  DrawerType,
  HdPrescriptionStatuses,
  MedicationDrawerType,
  MedicationFrequency,
  MedicationPlaces,
  MedicationStatus,
  PatientStatuses,
  ServiceModalName,
  UserPermissions,
} from '@enums';
import theme from '@src/styles/theme';
import { DiscontinueMedicationModal } from '@components/pages/PatientProfile';
import { ROUTES } from '@constants';

export type MedicationsExpandableRowProps = MedicationResponse;

export const MedicationsExpandableRow = ({
  doctor,
  frequency,
  duration,
  status,
  ...medication
}: MedicationsExpandableRowProps) => {
  const { t } = useTranslation('medications');
  const { t: tCommon } = useTranslation('common');
  const { t: tFrequency } = useTranslation(Dictionaries.MedicationFrequencyAll);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userId = selectUserId();
  const hasActiveDrawers = selectHasActiveDrawers();
  const permissions = selectUserPermissions();
  const isSaveSuccess = selectMedicationSaveDataSuccess();
  const [isDiscontinueMedicationModalOpen, setDiscontinueMedicationModalOpen] = useState(false);
  const patientStatus = selectPatientStatus();
  const isUnavailableStatus =
    patientStatus === PatientStatuses.Walk_In ||
    patientStatus === PatientStatuses.Dead ||
    patientStatus === PatientStatuses.Discharged;

  const isConfirmAllPermission = permissions.includes(UserPermissions.MedicationConfirmAll);
  const isConfirmExceptOwnPermission = permissions.includes(UserPermissions.MedicationConfirmExceptOwn);
  const isAnotherUserWithPermission =
    userId !== +medication.enteredBy.id && (isConfirmExceptOwnPermission || isConfirmAllPermission);
  const isCurrentUserWithConfirmAllPermission = userId === +medication.enteredBy.id && isConfirmAllPermission;

  const isConfirmDisabled = !(isAnotherUserWithPermission || isCurrentUserWithConfirmAllPermission) || hasActiveDrawers;
  const isActiveMedicationOrDiscontinued =
    status === MedicationStatus.Active || status === MedicationStatus.Discontinued;
  const noMedicationChangeDrugPermission = !permissions.includes(UserPermissions.MedicationChangeDrug);
  const isChangeDisabled = (!isActiveMedicationOrDiscontinued && noMedicationChangeDrugPermission) || hasActiveDrawers;

  useEffect(() => {
    if (isSaveSuccess && isDiscontinueMedicationModalOpen) {
      setDiscontinueMedicationModalOpen(false);
      dispatch(clearMedicationSaveSuccessState());
    }
  }, [isSaveSuccess]);

  const getFrequencyValue = () => {
    if (!frequency) return tFrequency(MedicationFrequency.EVERY_DIALYSIS);
    if (frequency.extValue) return frequency.extValue;
    return frequency?.code ? tFrequency(frequency.code) : '';
  };

  const handleDeleteMedication = () => {
    if (id) {
      dispatch(deleteMedication({ medicationId: medication.id, id }));
    }
  };

  const openConfirmChangeModal = useCallback(() => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          cancelButton: tCommon('button.cancel'),
          confirmButton: tCommon('button.continue'),
          title: t('youWantToChange', { name: capitalize(medication.medication.name) }),
          text:
            medication.place === MedicationPlaces.InCenter ? (
              <>
                <Box component="span">{t('actionWillDiscontinueCurrentPrescription')}</Box>
                <Box component="span" sx={{ color: theme.palette.error.main }}>
                  {t('injectionsAmount', {
                    amount: medication.administeredAmount?.toString() || '0',
                  })}
                </Box>
                <Box component="span">{t('beenAdministeredAlready')}</Box>
              </>
            ) : (
              t('actionWillDiscontinue')
            ),
          closeCallback: () => openDrawer(MedicationDrawerType.Change),
        },
      }),
    );
  }, []);

  const openDrawer = async (type: MedicationDrawerType) => {
    if (type === MedicationDrawerType.Confirm) {
      if (medication.place === MedicationPlaces.InCenter) {
        const { data: hdPrescriptionList }: AxiosResponse<HdPrescription[]> = await API.get(
          `pm/patients/${id}/prescriptions`,
        );
        const hasActivePrescription =
          hdPrescriptionList.filter(
            (prescription) =>
              prescription.status === HdPrescriptionStatuses.ACTIVE && medication.place === MedicationPlaces.InCenter,
          ).length > 0;

        if (!hasActivePrescription) {
          dispatch(
            addServiceModal({
              name: ServiceModalName.ConfirmModal,
              payload: {
                cancelButton: null,
                confirmButton: tCommon('button.ok'),
                title: t('setupPrescriptionOrChangeMedication'),
                text: null,
              },
            }),
          );
          return;
        }
      }
    }
    const data: MedicationForm = {
      ...medication,
      frequencyLongTerm:
        medication.place === MedicationPlaces.AtHome
          ? { value: frequency!.code, label: frequency?.extValue || tFrequency(frequency!.code) }
          : { value: '', label: '' },
      frequencyDialysisRelated: medication.place === MedicationPlaces.InCenter ? frequency!.code : undefined,
      doctorsName: { value: doctor?.internalDoctorId, label: doctor?.name as string, deleted: doctor?.deleted },
      doctorsSpecialityText: doctor?.speciality as string,
      doctorsSpecialitySelect: doctor?.internalDoctorId as number,
      nameDrug: {
        uid: medication.medication?.uid,
        label: medication.medication?.name,
        description: medication.medication?.description,
      },
      prescriptionDate: new Date(medication.prescriptionDate),
      durationType: duration.type,
      startDate: duration.startDate ? new Date(duration.startDate) : null,
      visitsAmount: duration.visitsAmount,
      dueDate: duration.dueDate ? new Date(duration.dueDate) : null,
    };
    dispatch(addMedicationFormData(data));
    dispatch(
      addDrawer({
        type: DrawerType.Medication,
        payload: { id, type },
        allowedPathsToShowDrawer: [ROUTES.patientsOverview],
      }),
    );
  };

  const discontinueMedication = useCallback(() => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          cancelButton: tCommon('button.cancel'),
          confirmButton: t('button.discontinue'),
          title: t('button.areYouSureDiscontinue', { medication: capitalize(medication.medication.name) }),
          text: null,
          closeCallback: () => setDiscontinueMedicationModalOpen(true),
        },
      }),
    );
  }, []);

  const onCloseDiscontinueMedicationModal = useCallback(() => setDiscontinueMedicationModalOpen(false), []);

  const getControlButtons = () => {
    switch (status) {
      case MedicationStatus.Unconfirmed:
        return (
          <>
            <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
              <span>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => openDrawer(MedicationDrawerType.Confirm)}
                  disabled={isConfirmDisabled || isUnavailableStatus}
                  data-testid="confirmMedicationButton"
                >
                  {t('tableView.confirm')}
                </Button>
              </span>
            </Tooltip>
            <Button
              variant="contained"
              size="medium"
              onClick={() => openDrawer(MedicationDrawerType.Edit)}
              disabled={hasActiveDrawers}
              data-testid="changeMedicationButton"
            >
              {t('tableView.edit')}
            </Button>
            <PermissionGuard permissions={UserPermissions.MedicationDelete}>
              <Button
                variant="contained"
                size="medium"
                onClick={() =>
                  dispatch(
                    addServiceModal({
                      name: ServiceModalName.ConfirmModal,
                      payload: {
                        closeCallback: handleDeleteMedication,
                        title: t('youWantToDelete', { name: medication.medication.name }),
                        confirmButton: tCommon('button.delete'),
                        cancelButton: tCommon('button.cancel'),
                      },
                    }),
                  )
                }
                data-testid="deleteMedicationButton"
              >
                {t('tableView.delete')}
              </Button>
            </PermissionGuard>
          </>
        );
      case MedicationStatus.Active:
        return (
          <>
            <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
              <span>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={openConfirmChangeModal}
                  disabled={isChangeDisabled || isUnavailableStatus}
                  data-testid="changePrescriptionButton"
                >
                  {t('button.changePrescription')}
                </Button>
              </span>
            </Tooltip>
            <Button variant="contained" size="medium" onClick={discontinueMedication} data-testid="discontinueButton">
              {t('button.discontinue')}
            </Button>
          </>
        );
      case MedicationStatus.Discontinued:
        return (
          <Button
            variant="contained"
            size="medium"
            onClick={openConfirmChangeModal}
            disabled={isChangeDisabled || isUnavailableStatus}
            data-testid="changePrescriptionButton"
          >
            {t('button.changePrescription')}
          </Button>
        );
    }
  };

  return (
    <>
      {isDiscontinueMedicationModalOpen && (
        <DiscontinueMedicationModal
          onClose={onCloseDiscontinueMedicationModal}
          medication={medication.medication}
          medicationId={medication.id}
          prescriptionDate={medication.prescriptionDate}
        />
      )}
      <Box sx={(theme) => ({ p: theme.spacing(1, 1, 2, 0) })}>
        <Stack direction="row" spacing={1}>
          {getControlButtons()}
        </Stack>
        {userId === +medication.enteredBy.id && !isConfirmAllPermission && status === MedicationStatus.Unconfirmed && (
          <WarningMessage text={tCommon('noRightsToOwnConfirm')} />
        )}
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={12} md={8} lg={6}>
            <DataRow
              title={t('tableView.nameOfDrag')}
              titleColor={theme.palette.text.darker}
              value={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="labelM">{capitalizeFirstLetter(medication.medication.name)}</Typography>
                </Stack>
              }
            />
            {medication.place === MedicationPlaces.InCenter && (
              <DataRow
                title={t('tableView.injectionsHaveBeenAdministered')}
                titleColor={theme.palette.text.darker}
                value={medication.administeredAmount ? medication.administeredAmount : '0'}
              />
            )}
            <DataRow
              title={t('tableView.administering')}
              titleColor={theme.palette.text.darker}
              value={medication.place ? t(`form.places.${medication.place}`) : ''}
            />
            <DataRow
              title={t('tableView.medicalGroup')}
              titleColor={theme.palette.text.darker}
              value={capitalizeFirstLetter(medication.medicationGroup)}
            />
            <DataRow
              title={t('tableView.route')}
              titleColor={theme.palette.text.darker}
              value={capitalizeFirstLetter(medication.route)}
            />
            <DataRow
              title={t('tableView.amount')}
              titleColor={theme.palette.text.darker}
              value={
                medication?.amount
                  ? medication.amount
                  : medication.amounts
                      .map((amount, index) => `${t('tableView.dialysisDay')} ${index + 1} - ${amount}`)
                      .join(', ')
              }
            />
            <DataRow
              title={t('tableView.frequency')}
              titleColor={theme.palette.text.darker}
              value={getFrequencyValue()}
            />
            <DataRow
              title={t('tableView.day')}
              titleColor={theme.palette.text.darker}
              value={
                medication?.day ? capitalizeFirstLetter(getCodeValueFromCatalog('dialysisDay', medication.day)) : '—'
              }
            />
            <DataRow
              title={t('tableView.meal')}
              titleColor={theme.palette.text.darker}
              value={capitalizeFirstLetter(medication.meal)}
            />
            {!!Object.keys(duration).length && (
              <>
                <DataRow
                  title={t('tableView.durationOfMedication')}
                  titleColor={theme.palette.text.darker}
                  value={t(`form.durationType.${duration.type}`)}
                />
                <DataRow
                  title={t('tableView.startDate')}
                  titleColor={theme.palette.text.darker}
                  value={dateFormat(duration.startDate)}
                />
                {!!duration.visitsAmount && (
                  <DataRow
                    title={t('tableView.visitsAmount')}
                    titleColor={theme.palette.text.darker}
                    value={duration.visitsAmount}
                  />
                )}
                {!!duration.dueDate && (
                  <DataRow
                    title={t('tableView.dueDate')}
                    titleColor={theme.palette.text.darker}
                    value={dateFormat(duration.dueDate)}
                  />
                )}
              </>
            )}
            <DataRow
              title={t('tableView.prescribedBy')}
              titleColor={theme.palette.text.darker}
              value={capitalize(getDoctorName(doctor))}
              additionalValue={dateFormat(medication.prescriptionDate)}
            />
            <DataRow
              title={t('tableView.enteredBy')}
              titleColor={theme.palette.text.darker}
              value={getPersonNameWithDeletedSyfix(medication.enteredBy)}
              additionalValue={dateFormat(medication.enteredDate)}
            />
            <DataRow
              title={t('tableView.editedBy')}
              titleColor={theme.palette.text.darker}
              value={getPersonNameWithDeletedSyfix(medication.editedBy)}
              additionalValue={medication?.editedDate ? dateFormat(medication.editedDate) : '—'}
            />
            <DataRow
              title={t('tableView.confirmedBy')}
              titleColor={theme.palette.text.darker}
              value={getPersonNameWithDeletedSyfix(medication.confirmedBy)}
              additionalValue={medication.confirmedDate ? dateFormat(medication.confirmedDate) : '—'}
            />
            <DataRow
              title={t('tableView.orderedToDiscontinue')}
              titleColor={theme.palette.text.darker}
              value={capitalize(medication?.orderedToDiscontinueBy?.name || '')}
              additionalValue={
                medication?.orderedToDiscontinueDate ? dateFormat(medication.orderedToDiscontinueDate) : '—'
              }
            />
            <DataRow
              title={t('tableView.discontinueBy')}
              titleColor={theme.palette.text.darker}
              value={getPersonNameWithDeletedSyfix(medication?.discontinuedBy)}
              additionalValue={medication?.discontinuedDate ? dateFormat(medication.discontinuedDate) : '—'}
            />
            <DataRow
              title={t('tableView.discontinueReason')}
              titleColor={theme.palette.text.darker}
              value={medication?.discontinuedReason}
            />
            <DataRow
              title={t('tableView.comments')}
              titleColor={theme.palette.text.darker}
              value={medication?.comments}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
