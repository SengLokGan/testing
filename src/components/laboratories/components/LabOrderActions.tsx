import { useTranslation } from 'react-i18next';
import { endOfDay, isPast } from 'date-fns';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppDispatch } from '@hooks/storeHooks';
import { useCallback, useState } from 'react';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { addDrawer } from '@store/slices/drawerSlice';
import {
  DrawerType,
  FormType,
  LabOrderEventPlace,
  LabOrderStatus,
  LabOrderType,
  LabResultInputType,
  PatientStatuses,
  ServiceModalName,
  UserPermissions,
} from '@enums';
import { deleteUrgentLabOrder, deleteLabResult } from '@store/slices/labOrdersSlice';
import { ROUTES } from '@constants';
import { PermissionGuard } from '@guards';
import { LabOrderTableData } from '@types';
import { selectPatientStatus } from '@store/slices';
import Tooltip from '@mui/material/Tooltip';

type LabOrderActionsProps = {
  orderId: string;
  fullData: LabOrderTableData;
};

export const LabOrderActions = ({ orderId, fullData }: LabOrderActionsProps) => {
  const { status, createdAt, resultInputType, type, planId } = fullData;
  const { t } = useTranslation('common');
  const { t: tLabOrders } = useTranslation('labOrders');
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const allowedStatuses = [
    LabOrderStatus.TO_PERFORM,
    LabOrderStatus.PENDING,
    LabOrderStatus.COMPLETED,
    LabOrderStatus.DRAFT,
  ];
  const patientStatus = selectPatientStatus();
  const isUnavailableStatus =
    patientStatus === PatientStatuses.Walk_In ||
    patientStatus === PatientStatuses.Dead ||
    patientStatus === PatientStatuses.Discharged;

  const onMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onDelete = useCallback((entityType: 'order' | 'result') => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () =>
            dispatch(
              entityType === 'order' ? deleteUrgentLabOrder({ id: +orderId }) : deleteLabResult({ id: +orderId }),
            ),
          title: tLabOrders('areYouSureDelete', { type: entityType }),
          text: '',
          confirmButton: t('button.delete'),
        },
      }),
    );
    setAnchorEl(null);
  }, []);

  const onEditOrder = useCallback(() => {
    setAnchorEl(null);

    dispatch(
      type === LabOrderType.URGENT
        ? addServiceModal({
            name: ServiceModalName.UrgentLabTest,
            payload: {
              place: LabOrderEventPlace.LabResults,
              mode: FormType.Edit,
              planId,
              disabledPatient: true,
              formInitialValues: {
                patient: { label: fullData.patient.name, value: fullData.patient.id },
                procedure: { label: fullData.procedureName, value: fullData.procedureId },
                laboratory: { label: fullData.labName, value: fullData.labId },
                specimenType: fullData.specimenType,
              },
            },
          })
        : addDrawer({
            type: type === LabOrderType.INDIVIDUAL ? DrawerType.IndividualLabTestPlanForm : DrawerType.QuarterlyBT,
            payload: {
              place: LabOrderEventPlace.LabResults,
              mode: FormType.Edit,
              planId,
              disabledPatient: true,
              formInitialValues: { patient: { label: fullData.patient.name, value: fullData.patient.id } },
            },
            allowedPathsToShowDrawer: [ROUTES.patientsOverview],
          }),
    );
  }, []);

  const onEnterLabResultsClick = useCallback((isEditing = false) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.EnterLabResultModal,
        payload: { labOrder: fullData, isEditing },
      }),
    );
    setAnchorEl(null);
  }, []);

  const onAttachFileClick = useCallback(() => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.AttachFileModal,
        payload: { labOrderId: fullData.id },
      }),
    );
    setAnchorEl(null);
  }, []);

  const AttachFileMenuItem = () => (
    <MenuItem data-testid="labOrdersAttachFileButton" onClick={onAttachFileClick}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <AttachFileIcon />
        <Box>{tLabOrders('buttons.attachFile')}</Box>
      </Stack>
    </MenuItem>
  );

  const renderMenu = () => {
    if (status === LabOrderStatus.TO_PERFORM)
      return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {fullData.type === LabOrderType.URGENT && isPast(endOfDay(new Date(createdAt))) ? (
            <Box></Box>
          ) : (
            <PermissionGuard permissions={UserPermissions.AnalysesModifyOrder}>
              <Tooltip title={isUnavailableStatus ? t('unavailableForPatients') : ''} enterTouchDelay={0}>
                <span>
                  <MenuItem data-testid="labOrdersEditButton" onClick={onEditOrder} disabled={isUnavailableStatus}>
                    {tLabOrders(fullData.type === LabOrderType.URGENT ? 'buttons.editOrder' : 'buttons.editPlan')}
                  </MenuItem>
                </span>
              </Tooltip>
            </PermissionGuard>
          )}
          {fullData.type === LabOrderType.URGENT && (
            <PermissionGuard permissions={UserPermissions.AnalysesDeleteOrder}>
              <MenuItem data-testid="labOrdersDeleteButton" onClick={() => onDelete('order')}>
                {tLabOrders('buttons.deleteOrder')}
              </MenuItem>
            </PermissionGuard>
          )}
        </Menu>
      );

    if (status === LabOrderStatus.PENDING)
      return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <PermissionGuard permissions={UserPermissions.AnalysesModifyResult}>
            <MenuItem data-testid="labOrdersEnterResultButton" onClick={() => onEnterLabResultsClick()}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DescriptionOutlinedIcon />
                <Box>{tLabOrders('buttons.enterResult')}</Box>
              </Stack>
            </MenuItem>
            <AttachFileMenuItem />
          </PermissionGuard>
        </Menu>
      );

    if (status === LabOrderStatus.COMPLETED)
      return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <PermissionGuard permissions={UserPermissions.AnalysesModifyResult}>
            <AttachFileMenuItem />
            {resultInputType === LabResultInputType.User && (
              <>
                <MenuItem data-testid="labOrdersDeleteResultButton" onClick={() => onDelete('result')}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <DeleteOutlineOutlinedIcon />
                    <Box>{tLabOrders('buttons.deleteResult')}</Box>
                  </Stack>
                </MenuItem>
                <MenuItem data-testid="labOrdersEditResultButton" onClick={() => onEnterLabResultsClick(true)}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <EditOutlinedIcon />
                    <Box>{tLabOrders('buttons.editResult')}</Box>
                  </Stack>
                </MenuItem>
              </>
            )}
          </PermissionGuard>
        </Menu>
      );

    if (status === LabOrderStatus.DRAFT)
      return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {fullData.type === LabOrderType.URGENT && isPast(endOfDay(new Date(createdAt))) ? (
            <Box></Box>
          ) : (
            <PermissionGuard permissions={UserPermissions.AnalysesModifyOrder}>
              <Tooltip title={isUnavailableStatus ? t('unavailableForPatients') : ''} enterTouchDelay={0}>
                <span>
                  <MenuItem data-testid="labOrdersEditButton" onClick={onEditOrder} disabled={isUnavailableStatus}>
                    {tLabOrders(fullData.type === LabOrderType.URGENT ? 'buttons.editOrder' : 'buttons.editPlan')}
                  </MenuItem>
                </span>
              </Tooltip>
            </PermissionGuard>
          )}
        </Menu>
      );

    return null;
  };

  if (!allowedStatuses.includes(status)) return null;

  return (
    <>
      <PermissionGuard
        permissions={[UserPermissions.AnalysesDeleteOrder, UserPermissions.AnalysesModifyOrder]}
        exact={false}
      >
        <IconButton data-testid="labOrdersViewTableExpandActionsButton" title="" onClick={onMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        {renderMenu()}
      </PermissionGuard>
    </>
  );
};
