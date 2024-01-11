import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HdPrescription, HdPrescriptionForm } from '@types';
import { DataRow } from '@components/DataRow/DataRow';
import {
  countSessionsBetweenDates,
  dateFormat,
  getHoursAndMinutes,
  getPersonNameWithDeletedSyfix,
  joinAndSortFrequencyDays,
} from '@utils';
import Button from '@mui/material/Button';
import { PermissionGuard } from '@guards';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import {
  addDrawer,
  addHdPrescriptionFormData,
  addServiceModal,
  deleteHdPrescription,
  selectHasActiveDrawers,
  selectHdPrescriptionSaveDataSuccess,
  selectPatientIsolationStatus,
  selectPatientStatus,
  selectUserPermissions,
} from '@store';
import { DrawerType, HdPrescriptionStatuses, PatientStatuses, ServiceModalName, UserPermissions } from '@enums';
import { ROUTES } from '@constants';
import { WarningMessage } from '@components';
import { DiscontinueHdPrescriptionModal } from '@components/pages/PatientProfile/modals/DiscontinueHdPrescriptionModal';
import Tooltip from '@mui/material/Tooltip';

export type HdPrescriptionsExpandableRowProps = HdPrescription;

export const HdPrescriptionsExpandableRow = ({
  enteredAt,
  prescriptionDate,
  ...prescription
}: HdPrescriptionsExpandableRowProps) => {
  const { t } = useTranslation('hdPrescription');
  const { t: tCommon } = useTranslation('common');
  const [isDiscontinueHdPrescriptionModalOpen, setDiscontinueHdPrescriptionModalOpen] = useState(false);
  const isSaveSuccess = selectHdPrescriptionSaveDataSuccess();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userPermissions = selectUserPermissions();
  const hasActiveDrawers = selectHasActiveDrawers();
  const patientIsolationStatus = selectPatientIsolationStatus();
  const patientStatus = selectPatientStatus();

  const hasVirus = prescription?.isolationGroup?.isolations?.length > 0;
  const isUnavailableStatus =
    patientStatus === PatientStatuses.Walk_In ||
    patientStatus === PatientStatuses.Dead ||
    patientStatus === PatientStatuses.Discharged;

  const openDrawer = async () => {
    if (patientIsolationStatus === null) {
      dispatch(
        addServiceModal({
          name: ServiceModalName.ConfirmModal,
          payload: {
            cancelButton: null,
            confirmButton: tCommon('button.ok'),
            title: t('modals.isolationStatus.title'),
            text: null,
          },
        }),
      );
    } else {
      const { prescribedBy, ...prescriptionData } = prescription;

      const data: HdPrescriptionForm = {
        ...prescriptionData,
        prescribedBy: prescribedBy
          ? {
              label: prescribedBy.name,
              value: prescribedBy.internalDoctorId as number,
              source: prescribedBy.source,
              speciality: prescribedBy.speciality,
            }
          : undefined,
        prescriptionDate: new Date(prescriptionDate),
        schedule: {
          ...(prescriptionData?.schedule?.recurrent
            ? {
                recurrent: {
                  frequency: prescriptionData.schedule.recurrent.frequency,
                  daysOfWeek: prescriptionData.schedule.recurrent.daysOfWeek,
                  shift: {
                    id: prescriptionData.schedule.recurrent.shift.id,
                    name: prescriptionData.schedule.recurrent.shift.name,
                  },
                  startedAt: new Date(prescriptionData.schedule.recurrent.startedAt),
                  endsAt: new Date(prescriptionData.schedule.recurrent.endsAt),
                  duration: prescriptionData.schedule.recurrent.duration,
                },
              }
            : {}),
          ...(prescriptionData?.schedule?.adHoc
            ? {
                adHoc: {
                  dateShifts: prescriptionData?.schedule?.adHoc.dateShifts.map(({ date, duration, shift }) => ({
                    duration,
                    shiftId: `${shift.id}`,
                    date,
                  })),
                },
              }
            : {}),
        },
      };
      dispatch(addHdPrescriptionFormData(data));
      dispatch(
        addDrawer({
          type: DrawerType.HdPrescriptionForm,
          payload: { id },
          allowedPathsToShowDrawer: [ROUTES.patientsOverview],
        }),
      );
    }
  };

  useEffect(() => {
    isSaveSuccess && isDiscontinueHdPrescriptionModalOpen && setDiscontinueHdPrescriptionModalOpen(false);
  }, [isSaveSuccess]);
  const discontinueHandler = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => setDiscontinueHdPrescriptionModalOpen(true),
          title: t('modals.confirmDiscontinue.title'),
          text: t('modals.confirmDiscontinue.description'),
          confirmButton: tCommon('button.discontinue'),
        },
      }),
    );
  };

  const onCloseDiscontinueHdPrescriptionModal = useCallback(() => setDiscontinueHdPrescriptionModalOpen(false), []);

  const getControlButtons = () => {
    return (
      <Stack direction="row" spacing={1} sx={{ py: 1 }}>
        <PermissionGuard permissions={UserPermissions.DialysisEditPrescriptions}>
          <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
            <span>
              <Button
                variant="contained"
                size="medium"
                onClick={() => openDrawer()}
                disabled={hasActiveDrawers || isUnavailableStatus}
                data-testid="changeHdPrescriptionButton"
              >
                {tCommon('button.edit')}
              </Button>
            </span>
          </Tooltip>
        </PermissionGuard>
        <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
          <span>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                if (id) {
                  dispatch(
                    addServiceModal({
                      name: ServiceModalName.ConfirmModal,
                      payload: {
                        cancelButton: tCommon('button.cancel'),
                        confirmButton: tCommon('button.delete'),
                        title: t('areYouSureDeletePrescription'),
                        text: tCommon('deletedDataWillBeLostForever'),
                        closeCallback: () => dispatch(deleteHdPrescription({ patientId: id })),
                      },
                    }),
                  );
                }
              }}
              disabled={
                isUnavailableStatus ||
                hasActiveDrawers ||
                !userPermissions.includes(UserPermissions.DialysisDeletePrescriptions)
              }
              data-testid="deleteHdPrescriptionButton"
            >
              {tCommon('button.delete')}
            </Button>
          </span>
        </Tooltip>
        <PermissionGuard permissions={UserPermissions.DialysisDiscontinuePrescription}>
          <Button
            variant="contained"
            size="medium"
            onClick={discontinueHandler}
            data-testid="discontinueHdPrescriptionButton"
          >
            {tCommon('button.discontinue')}
          </Button>
        </PermissionGuard>
      </Stack>
    );
  };

  return (
    <>
      {isDiscontinueHdPrescriptionModalOpen && (
        <DiscontinueHdPrescriptionModal
          onClose={onCloseDiscontinueHdPrescriptionModal}
          prescriptionId={prescription.id}
        />
      )}
      {prescription.status === HdPrescriptionStatuses.ACTIVE && getControlButtons()}
      {!userPermissions.includes(UserPermissions.DialysisDeletePrescriptions) && (
        <WarningMessage text={tCommon('onlyCanDeletePrescriptions')} />
      )}
      <Column title={t('tableView.generalInfo')}>
        <DataRow
          title={t('tableView.prescribedBy')}
          value={getPersonNameWithDeletedSyfix(prescription.prescribedBy)}
          additionalValue={prescriptionDate ? dateFormat(prescriptionDate) : '—'}
        />
        <DataRow
          title={t('tableView.enteredBy')}
          value={getPersonNameWithDeletedSyfix(prescription.enteredBy)}
          additionalValue={enteredAt ? format(new Date(enteredAt), 'dd/MM/yyyy hh:mm a') : '—'}
        />
        <DataRow title={t('tableView.bloodFlow')} value={prescription.bloodFlow} />
        <DataRow title={t('tableView.dryWeight')} value={prescription.dryWeight} />
        {prescription?.discontinuedBy && (
          <>
            <DataRow
              title={t('tableView.discontinuedBy')}
              value={getPersonNameWithDeletedSyfix(prescription.discontinuedBy)}
              additionalValue={prescription?.discontinuedAt ? dateFormat(prescription?.discontinuedAt) : '—'}
            />
            <DataRow title={t('tableView.discontinueReason')} value={prescription?.discontinuedReason} />
          </>
        )}
      </Column>
      <Column title={t('tableView.dialyzer')}>
        <DataRow
          title={t('tableView.dialyzerUtilization')}
          value={t(`dialyzerUseTypes.${prescription.dialyzerUseType}`)}
        />
        <DataRow title={t('tableView.dialyzerBrand')} value={prescription.dialyzerBrand} />
        <DataRow title={t('tableView.surfaceArea')} value={prescription.surfaceArea} />
      </Column>
      <Column title={t('tableView.dialysate')}>
        <DataRow title={t('tableView.calcium')} value={prescription.calcium} />
        <DataRow title={t('tableView.sodiumStart')} value={prescription.sodiumStart} />
        <DataRow title={t('tableView.sodiumEnd')} value={prescription.sodiumEnd} />
        <DataRow title={t('tableView.potassium')} value={prescription.potassium} />
        <DataRow title={t('tableView.temperature')} value={prescription.temperature} />
        <DataRow title={t('tableView.flowQd')} value={prescription.flow} />
      </Column>
      <Column title={t('tableView.anticoagulant')}>
        <DataRow title={t('tableView.anticoagulantType')} value={prescription.anticoagulantType} />
        <DataRow title={t('tableView.primeDoseUnits')} value={prescription.primeDose} />
        <DataRow title={t('tableView.bolusDoseUnits')} value={prescription.bolusDose} />
        <DataRow title={t('tableView.hourlyDoseUnits')} value={prescription.hourlyDose} />
      </Column>
      <Column title={t('tableView.scheduling')}>
        <DataRow title={t('tableView.isolation')} value={t(`form.${hasVirus ? 'isolated' : 'nonInfection'}`)} />
        {prescription.schedule.recurrent ? (
          <>
            <DataRow
              title={t('tableView.frequency')}
              value={t(`frequencyCodes.${prescription.schedule.recurrent.frequency}`)}
            />
            <DataRow
              title={t('form.days')}
              value={`${joinAndSortFrequencyDays(prescription.schedule.recurrent.daysOfWeek, ', ')} - ${
                prescription?.schedule.recurrent.shift.name
              } ${t('form.shift')}`}
            />
            <DataRow
              title={t('tableView.duration')}
              value={getHoursAndMinutes(prescription?.schedule.recurrent.duration)}
            />
            <DataRow
              title={t('tableView.startDate')}
              value={
                prescription?.schedule.recurrent?.startedAt
                  ? format(new Date(prescription.schedule.recurrent.startedAt), 'dd/MM/yyyy')
                  : ''
              }
            />
            <DataRow
              title={t('tableView.endDate')}
              value={
                prescription?.schedule.recurrent?.endsAt
                  ? format(new Date(prescription.schedule.recurrent.endsAt), 'dd/MM/yyyy')
                  : ''
              }
            />
            <DataRow
              title={t('tableView.hdSessions')}
              value={
                prescription?.schedule.recurrent?.startedAt && prescription?.schedule.recurrent?.endsAt
                  ? countSessionsBetweenDates(
                      prescription.schedule.recurrent.startedAt,
                      prescription.schedule.recurrent.endsAt,
                      prescription.schedule.recurrent.daysOfWeek,
                    )
                  : ''
              }
            />
          </>
        ) : (
          <>
            {prescription?.schedule.adHoc?.dateShifts &&
              prescription?.schedule.adHoc.dateShifts.map(({ date, shift, duration }, index) => (
                <DataRow
                  key={shift.id}
                  title={`${t('form.day')} ${index + 1}`}
                  value={`${format(new Date(date), 'dd/MM/yyyy')} - ${shift.name} ${t(
                    'form.shift',
                  )} (${getHoursAndMinutes(Number(duration))})`}
                />
              ))}
          </>
        )}
      </Column>
      <Column title={t('tableView.comments')}>
        <Typography variant="labelM" sx={{ mt: `0 !important`, mb: (theme) => `${theme.spacing(2)} !important` }}>
          {prescription.comments ?? '—'}
        </Typography>
      </Column>
    </>
  );
};

const Column = ({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) => {
  return (
    <Stack
      spacing={2}
      sx={(theme) => ({
        pt: theme.spacing(1),
        mb: (theme) => theme.spacing(0.5),
      })}
    >
      <Typography variant="labelL" sx={{ mb: (theme) => theme.spacing(0.5) }}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
