import type { AccessManagement } from '@types';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataRow } from '@components/DataRow/DataRow';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';
import {
  addServiceModal,
  addDrawer,
  selectHasActiveDrawers,
  addAccessManagementForm,
  deleteAccessManagement,
  discontinueAccessManagement,
  exportAccessManagement,
  selectPatientStatus,
} from '@store';
import {
  DrawerType,
  ServiceModalName,
  UserPermissions,
  AccessManagementStatuses,
  AccessCategory,
  Instillation,
  NeedleSize,
  PatientStatuses,
} from '@enums';
import { ROUTES } from '@constants';
import { PermissionGuard } from '@guards';
import { dateFormat, getPersonNameWithDeletedSyfix } from '@utils';
import Typography from '@mui/material/Typography';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Tooltip from '@mui/material/Tooltip';

export const AccessManagementExpandableRow = (access: AccessManagement) => {
  const { t } = useTranslation('accessManagement');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const hasActiveDrawers = selectHasActiveDrawers();
  const patientStatus = selectPatientStatus();
  const isUnavailableStatus =
    patientStatus === PatientStatuses.Walk_In ||
    patientStatus === PatientStatuses.Dead ||
    patientStatus === PatientStatuses.Discharged;

  const accessCategoryValue = `${getCodeValueFromCatalog('accessCategories', access.accessCategory!)}, ${
    access.accessCategory === AccessCategory.VascularAccess
      ? getCodeValueFromCatalog('accessTypes', access.type!)
      : getCodeValueFromCatalog('cvcCategories', access.category!)
  }, ${getCodeValueFromCatalog('sides', access.side!)}`;

  const onEditHandler = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: openDrawer,
          title: t('modal.areYouSureChange'),
          text: '',
          confirmButton: tCommon('button.continue'),
        },
      }),
    );
  };

  const onDiscontinueHandler = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => {
            dispatch(discontinueAccessManagement({ hdAccessId: access.id!, patientId: id! }));
          },
          title: t('modal.areYouSureDiscontinue'),
          text: '',
          confirmButton: tCommon('button.discontinue'),
        },
      }),
    );
  };

  const openDrawer = () => {
    dispatch(addAccessManagementForm(access));
    dispatch(
      addDrawer({
        type: DrawerType.AccessManagementForm,
        payload: { id },
        allowedPathsToShowDrawer: [ROUTES.patientsOverview],
      }),
    );
  };

  const onDeleteHandler = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => dispatch(deleteAccessManagement({ hdAccessId: access.id!, patientId: id! })),
          title: t('modal.areYouSureDelete'),
          text: t('modal.deleteForever'),
          confirmButton: tCommon('button.delete'),
        },
      }),
    );
  };

  const getNeedleSizeSubtext = (size: NeedleSize | undefined) => {
    switch (size?.toString()) {
      case NeedleSize.Gauge17:
        return t('modal.300MlMin');
      case NeedleSize.Gauge16:
        return t('modal.300350MlMin');
      case NeedleSize.Gauge15:
        return t('modal.350450MlMin');
      case NeedleSize.Gauge14:
        return t('modal.450MlMin');
      default:
        return '';
    }
  };
  const vascularAccessView = () => (
    <>
      <DataRow title={t('tableView.note')} value={access.note} />
      <DataRow
        title={t('tableView.dateOfCreation')}
        value={access.creationDate ? dateFormat(access.creationDate) : '—'}
      />
      <DataRow title={t('tableView.createdBy')} value={access.createdAtPlaceBy} />
      <DataRow title={t('tableView.createdAt')} value={access.createdAtPlace} />
      <DataRow title={t('tableView.needleType')} value={getCodeValueFromCatalog('needleTypes', access.needle?.type!)} />
      <DataRow
        title={t('tableView.needleSizeA')}
        value={getCodeValueFromCatalog('needleSizes', access.needle?.arterialSize!)}
        additionalValue={getNeedleSizeSubtext(access.needle?.arterialSize)}
      />
      <DataRow
        title={t('tableView.needleSizeV')}
        value={getCodeValueFromCatalog('needleSizes', access.needle?.venousSize!)}
        additionalValue={getNeedleSizeSubtext(access.needle?.venousSize)}
      />
    </>
  );

  const cvcAccessView = () => (
    <>
      <DataRow
        title={t('tableView.dateOfInsertion')}
        value={access.insertionDate ? dateFormat(access.insertionDate) : '—'}
      />
      <DataRow
        title={t('tableView.instillation')}
        value={
          access.instillation?.code === Instillation.Others
            ? access.instillation.extValue?.replace(/\\n/g, '\n')
            : getCodeValueFromCatalog('instillation', access.instillation?.code! as string)
        }
      />
      <DataRow
        title={t('tableView.arterial')}
        value={access.arterialVolume ? `${access.arterialVolume} ${t('modal.ml')}` : '—'}
      />
      <DataRow
        title={t('tableView.venous')}
        value={access.venousVolume ? `${access.venousVolume} ${t('modal.ml')}` : '—'}
      />
    </>
  );

  const exportAccessManagementHandler = () =>
    dispatch(exportAccessManagement({ hdAccessId: access.id!, patientId: id! }));

  const controlButtons = () => (
    <Stack direction="row" spacing={1} sx={{ py: 1 }}>
      <PermissionGuard permissions={UserPermissions.PatientModifyAccess}>
        <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
          <span>
            <Button
              variant="contained"
              size="medium"
              onClick={onEditHandler}
              disabled={hasActiveDrawers || isUnavailableStatus}
              data-testid="changeAccessManagementButton"
            >
              {tCommon('button.edit')}
            </Button>
          </span>
        </Tooltip>
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.PatientDeleteAccess}>
        <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
          <span>
            <Button
              variant="contained"
              size="medium"
              disabled={hasActiveDrawers || isUnavailableStatus}
              onClick={onDeleteHandler}
              data-testid="deleteAccessManagementButton"
            >
              {tCommon('button.delete')}
            </Button>
          </span>
        </Tooltip>
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.PatientDiscontinueAccess}>
        <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
          <span>
            <Button
              variant="contained"
              size="medium"
              disabled={hasActiveDrawers || isUnavailableStatus}
              onClick={onDiscontinueHandler}
              data-testid="discontinueAccessManagementButton"
            >
              {tCommon('button.discontinue')}
            </Button>
          </span>
        </Tooltip>
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.PatientViewAccess}>
        <Button
          onClick={exportAccessManagementHandler}
          variant="outlined"
          size="medium"
          data-testid="printAccessManagementButton"
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="labelM">{tCommon('button.print')}</Typography>
            <LocalPrintshopOutlinedIcon fontSize="small" sx={({ palette }) => ({ color: palette.primary.main })} />
          </Stack>
        </Button>
      </PermissionGuard>
    </Stack>
  );

  return (
    <>
      {access.status === AccessManagementStatuses.ACTIVE && controlButtons()}
      <Stack
        spacing={2}
        sx={(theme) => ({
          pt: theme.spacing(1),
          mb: (theme) => theme.spacing(0.5),
        })}
      >
        <DataRow
          title={t('tableView.enteredBy')}
          value={getPersonNameWithDeletedSyfix(access.enteredBy)}
          additionalValue={access.enteredAt ? dateFormat(access.enteredAt) : '-'}
        />
        {access.editedBy && (
          <DataRow
            title={t('tableView.editedBy')}
            value={getPersonNameWithDeletedSyfix(access.editedBy)}
            additionalValue={access.editedAt ? dateFormat(access.editedAt) : '-'}
          />
        )}
        <DataRow title={t('tableView.accessCategory')} value={accessCategoryValue} />
        {access.accessCategory === AccessCategory.CVC ? cvcAccessView() : vascularAccessView()}
        <DataRow title={t('tableView.comments')} value={access.comments} />
      </Stack>
    </>
  );
};
