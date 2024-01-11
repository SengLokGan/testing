import ErrorIcon from '@mui/icons-material/Error';
import { Button, Stack, Typography } from '@mui/material';
import {
  selectHdPrescriptions,
  selectHdPrescriptionsLoaded,
  selectHdPrescriptionsLoading,
  exportHdPrescription,
} from '@store/slices/hdPrescriptionSlice';
import { RichTable } from '@components';
import { getHdPrescriptionsViewTableColumns } from '@constants';
import { HdPrescriptionStatuses, UserPermissions } from '@enums';
import { HdPrescriptionsExpandableRow, HdPrescriptionsExpandableRowProps } from '@components/pages/PatientProfile';
import { useTranslation } from 'react-i18next';
import { PermissionGuard } from '@guards/PermissionGuard';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@hooks/storeHooks';

export const HdPrescriptionsTable = () => {
  const { t: tCommon } = useTranslation('common');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const prescriptionsList = selectHdPrescriptions();
  const loading = selectHdPrescriptionsLoading();
  const prescriptionsLoaded = selectHdPrescriptionsLoaded();
  const hasPrescriptions =
    prescriptionsList.filter((prescription) => prescription.status === HdPrescriptionStatuses.ACTIVE).length > 0 &&
    !loading;
  const { t } = useTranslation('hdPrescription');

  const tableHeader = (
    <Typography variant="headerM" sx={{ mb: 0 }}>
      {t('tableView.hdPrescription')}
    </Typography>
  );

  const emptyTableHeader = (
    <Stack direction="row" alignItems="center">
      <ErrorIcon sx={(theme) => ({ fill: theme.palette.error[40], mr: theme.spacing(2.25) })} />
      <Typography variant="headerS" sx={{ mb: 0, color: (theme) => theme.palette.error[40] }}>
        <span>{t('tableView.noActiveHdPrescription')}</span>
      </Typography>
    </Stack>
  );

  const printHdPrescriptionHandler = () => id && dispatch(exportHdPrescription(id));

  return (
    <RichTable
      fullScreen
      stickyHeader
      collapsableRow
      headerDivider
      columns={getHdPrescriptionsViewTableColumns()}
      rows={prescriptionsList}
      isDataLoading={loading}
      onChangePage={(() => {}) as any}
      onChangeRowsPerPage={(() => {}) as any}
      renderCollapsableRow={(rowData: HdPrescriptionsExpandableRowProps) => (
        <HdPrescriptionsExpandableRow {...rowData} />
      )}
      sx={{
        '.MuiTableBody-root .MuiTableCell-body': {
          padding: (theme) => `${theme.spacing(0.75)} ${theme.spacing(2)}`,
          '&:first-child': {
            pr: 1,
            pl: 3,
          },
        },
        '.MuiTableHead-root .MuiTableRow-head .MuiTableCell-root': {
          '&:first-child': {
            pr: 1,
            pl: 3,
          },
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {hasPrescriptions || !prescriptionsLoaded ? tableHeader : emptyTableHeader}
        <PermissionGuard permissions={[UserPermissions.DialysisViewPrescriptions, UserPermissions.PatientViewAccess]}>
          <Button onClick={printHdPrescriptionHandler} variant="outlined" data-testid="printHdPrescriptionButton">
            <Stack direction="row" spacing={1}>
              <Typography variant="labelL">{tCommon('button.print')}</Typography>
              <LocalPrintshopOutlinedIcon sx={({ palette }) => ({ color: palette.primary.main })} />
            </Stack>
          </Button>
        </PermissionGuard>
      </Stack>
    </RichTable>
  );
};
