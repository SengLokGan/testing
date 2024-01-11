import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DialysisServiceCard from '../../DialysisServiceCard';
import { useAppDispatch } from '@hooks';
import {
  LabOrderEventPlace,
  ServiceModalName,
  UserPermissions,
  LabOrderStatus,
  PatientStatuses,
  LabOrderType,
  LabSpecimenType,
  FormType,
} from '@enums';
import palette from '@src/styles/theme/palette';
import { capitalizeFirstLetter, Dictionaries } from '@utils';
import {
  addServiceModal,
  deleteUrgentLabOrder,
  exportLabOrder,
  resetLabOrdersList,
  selectDialysisLoading,
  selectDialysisPatient,
  selectDialysisSkipInfo,
  selectIsDisableInterface,
  selectLabOrdersIsSubmitting,
  selectLabOrdersService,
  selectUserPermissions,
  submitLabOrders,
} from '@store';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from '@mui/material/CircularProgress';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { PermissionGuard } from '@guards';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import type { LabOrdersServiceResponse } from '@types';

export const DialysisServicesLaboratoryCard = () => {
  const dispatch = useAppDispatch();
  const skipInfo = selectDialysisSkipInfo();
  const isSubmitting = selectLabOrdersIsSubmitting();
  const orders: LabOrdersServiceResponse[] = selectLabOrdersService() || [];
  const userPermissions = selectUserPermissions();
  const isLoading = selectDialysisLoading();
  const { t } = useTranslation('dialysis');
  const { t: tCommon } = useTranslation('common');
  const { t: tLabs } = useTranslation('labOrders');
  const { t: tLabSpecimenTypes } = useTranslation(Dictionaries.LabOrdersSpecimenTypes);
  const { t: tLabTypes } = useTranslation(Dictionaries.LabOrderTypes);
  const isDisabledInterface = selectIsDisableInterface();
  const patient = selectDialysisPatient();

  const isUnavailableStatus =
    patient?.status === PatientStatuses.Walk_In ||
    patient?.status === PatientStatuses.Dead ||
    patient?.status === PatientStatuses.Discharged;

  useEffect(() => {
    dispatch(resetLabOrdersList());
  }, []);

  const openUrgentLabTestModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.UrgentLabTest,
        payload: {
          place: LabOrderEventPlace.Dialysis,
          mode: FormType.Add,
          disabledPatient: true,
          formInitialValues: {
            patient: { label: patient.patientName, value: patient.id },
            procedure: null,
            laboratory: null,
            specimenType: LabSpecimenType.BLOOD,
          },
        },
      }),
    );
  };

  const performLabOrderHandler = (order: LabOrdersServiceResponse) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.PerformLabTest,
        payload: {
          defaultFormValues: {
            patient: { name: patient.patientName, id: patient.id },
            labName: order.labName,
            procedureName: order.procedureName,
            specimenType: order.specimenType,
            performedAt: order.performedAt,
            performedBy: order.performedBy,
          },
          place: LabOrderEventPlace.Dialysis,
          orderId: order.id,
        },
      }),
    );
  };
  const submitLabOrderHandler = (id: number) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => dispatch(submitLabOrders({ orderIds: [id], place: LabOrderEventPlace.Dialysis })),
          title: tLabs('modal.submitOrderConfirmation'),
          text: tLabs('modal.makeSureAllNecessarySamplesAreReady'),
          confirmButton: tCommon('button.confirm'),
        },
      }),
    );
  };

  const deleteUrgentLabOrderHandler = (id: number) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => dispatch(deleteUrgentLabOrder({ id, place: LabOrderEventPlace.Dialysis })),
          title: tLabs('areYouSureDelete', { type: tLabs('order') }),
          text: '',
          confirmButton: tCommon('button.delete'),
        },
      }),
    );
  };

  const getLabTestButtons = ({
    id,
    planId,
    status,
    type,
    procedureName,
    procedureId,
    labName,
    labId,
    specimenType,
  }: LabOrdersServiceResponse) => {
    if (status === LabOrderStatus.TO_PERFORM && type === LabOrderType.URGENT) {
      return (
        <>
          <IconButton
            data-testid="laboratoryCardOpenLabOrderModal"
            onClick={() =>
              dispatch(
                addServiceModal({
                  name: ServiceModalName.UrgentLabTest,
                  payload: {
                    place: LabOrderEventPlace.Dialysis,
                    mode: FormType.Edit,
                    planId,
                    disabledPatient: true,
                    formInitialValues: {
                      patient: { label: patient.patientName, value: patient.id },
                      procedure: { label: procedureName, value: procedureId },
                      laboratory: { label: labName, value: labId },
                      specimenType: specimenType,
                    },
                  },
                }),
              )
            }
          >
            <EditOutlinedIcon />
          </IconButton>
          <PermissionGuard permissions={UserPermissions.AnalysesPrintForm}>
            <IconButton data-testid="laboratoryCardPrint" onClick={() => printLabOrder(id)}>
              <LocalPrintshopOutlinedIcon />
            </IconButton>
          </PermissionGuard>
          <IconButton data-testid="laboratoryCardDeleteLabOrder" onClick={() => deleteUrgentLabOrderHandler(id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </>
      );
    } else {
      return (
        <PermissionGuard permissions={UserPermissions.AnalysesPrintForm}>
          <IconButton data-testid="laboratoryCardPrint" onClick={() => printLabOrder(id)}>
            <LocalPrintshopOutlinedIcon />
          </IconButton>
        </PermissionGuard>
      );
    }
  };

  const printLabOrder = (orderId) => dispatch(exportLabOrder(orderId));

  return (
    <DialysisServiceCard title={tLabs('service.labTests')}>
      {!isLoading && (
        <Stack alignItems="flex-start">
          {!orders.length && (
            <Typography mb={3} variant="labelM">
              {tLabs('service.noNecessaryTestsForToday')}
            </Typography>
          )}

          {orders.map((order) => {
            return (
              <Card
                key={order.id}
                data-testid={`labOrder${order.id}`}
                sx={({ spacing }) => ({
                  mb: 2,
                  width: 1,
                  backgroundColor: `${getOrderCardBackgroundColor(order.status)} !important`,
                  border: (theme) => `solid 1px ${theme.palette.border.default}`,
                  borderRadius: `${spacing(1.5)} !important`,
                })}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    p: ({ spacing }) => spacing(2, 3),
                    borderBottom: (theme) => `solid 1px ${theme.palette.border.default}`,
                  }}
                >
                  <Typography variant="labelL">{capitalizeFirstLetter(order.procedureName)}</Typography>
                  {skipInfo?.skipComment && (
                    <Stack direction="row" spacing={0.5}>
                      <CancelIcon sx={{ fill: ({ palette }) => palette.error.main }} />
                      <Typography variant="labelM">{t('skipped')}</Typography>
                    </Stack>
                  )}
                  {(order.status === LabOrderStatus.PENDING || order.status === LabOrderStatus.COMPLETED) &&
                    !skipInfo?.skipComment && (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {order.status === LabOrderStatus.PENDING ? (
                          <ChangeCircleIcon sx={{ fill: '#FFD600' }} />
                        ) : (
                          <CheckCircleIcon sx={{ fill: '#006D3C' }} />
                        )}
                        <Typography variant="labelM">{tCommon(`statuses.${order.status}`)}</Typography>
                      </Stack>
                    )}
                  {!isDisabledInterface && !skipInfo?.skipComment && order.status === LabOrderStatus.TO_PERFORM && (
                    <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
                      <span>
                        <Button
                          variant="outlined"
                          onClick={() => performLabOrderHandler(order)}
                          disabled={
                            !userPermissions.includes(UserPermissions.AnalysesSubmitOrder) ||
                            isSubmitting ||
                            isUnavailableStatus
                          }
                        >
                          {tCommon('button.perform')}
                          {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
                        </Button>
                      </span>
                    </Tooltip>
                  )}
                  {!isDisabledInterface && !skipInfo?.skipComment && order.status === LabOrderStatus.TO_SUBMIT && (
                    <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
                      <span>
                        <Button
                          variant="outlined"
                          onClick={() => submitLabOrderHandler(order.id)}
                          disabled={
                            !userPermissions.includes(UserPermissions.AnalysesSubmitOrder) ||
                            isSubmitting ||
                            isUnavailableStatus
                          }
                        >
                          {tCommon('button.submit')}
                          {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
                        </Button>
                      </span>
                    </Tooltip>
                  )}
                </Stack>
                <Stack
                  sx={{
                    p: ({ spacing }) => spacing(2, 3),
                  }}
                >
                  {renderCardRow(
                    tLabs('service.labOrderNum'),
                    order.number,
                    0,
                    isDisabledInterface ? null : <Stack direction="row">{getLabTestButtons(order)}</Stack>,
                  )}
                  {renderCardRow(tLabs('service.laboratory'), order.labName)}
                  {renderCardRow(tLabs('service.specimenType'), tLabSpecimenTypes(order.specimenType))}
                  {order?.type && renderCardRow(tLabs('service.orderType'), tLabTypes(order.type))}
                  {order?.performedAt &&
                    renderCardRow(
                      tLabs('service.performedTime'),
                      format(new Date(order.performedAt), 'dd/MM/yyyy hh:mm a'),
                    )}
                  {order?.performedBy && renderCardRow(tLabs('service.performedBy'), order.performedBy.name)}
                  {order?.comments && renderCardRow(tLabs('service.comments'), order.comments)}
                </Stack>
              </Card>
            );
          })}

          {!isDisabledInterface && (
            <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
              <span>
                <Button
                  variant="outlined"
                  onClick={openUrgentLabTestModal}
                  sx={{ pl: 1 }}
                  disabled={isDisabledInterface || isUnavailableStatus}
                >
                  <AddIcon
                    sx={{
                      color: (theme) =>
                        isDisabledInterface || isUnavailableStatus
                          ? theme.palette.neutral[60]
                          : theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  {tLabs('service.addLabTest')}
                </Button>
              </span>
            </Tooltip>
          )}
        </Stack>
      )}
    </DialysisServiceCard>
  );
};

const getOrderCardBackgroundColor = (status: LabOrderStatus) => {
  if (status === LabOrderStatus.TO_PERFORM) {
    return 'rgba(0, 99, 153, 0.08)';
  }
  return palette.background.default;
};

const renderCardRow = (name: ReactNode, value: ReactNode, mb = 1, additional?: ReactNode) => {
  return (
    <Stack direction="row" justifyContent="space-between" mb={mb}>
      <Stack direction="row" alignItems="center">
        <Typography variant="labelM" sx={{ minWidth: (theme) => theme.spacing(23.25) }}>
          {name}:
        </Typography>
        <Typography variant="labelM" sx={{ minWidth: (theme) => theme.spacing(23.25) }}>
          {value || '—'}
        </Typography>
      </Stack>

      {additional}
    </Stack>
  );
};
