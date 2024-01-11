import type { Row, AccessManagement } from '@types';
import { useMemo } from 'react';
import { selectAccessManagement, selectAccessManagementLoading } from '@store/slices/accessManagementSlice';
import { useTranslation } from 'react-i18next';
import { RichTable } from '@components';
import { getAccessManagementsViewTableColumns } from '@constants';
import { AccessManagementStatuses } from '@enums';
import { AccessManagementExpandableRow } from '@components/pages/PatientProfile/tables/components';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export const AccessManagementTable = () => {
  const accessManagement = selectAccessManagement();
  const loading = selectAccessManagementLoading();
  const { t } = useTranslation('accessManagement');

  const accessManagementViewTableColumns = useMemo(getAccessManagementsViewTableColumns, []);

  const isHasActiveAccess = useMemo(() => {
    return accessManagement ? accessManagement.some(({ status }) => status === AccessManagementStatuses.ACTIVE) : false;
  }, [accessManagement]);

  return (
    <RichTable
      fullScreen
      stickyHeader
      collapsableRow
      headerDivider
      columns={accessManagementViewTableColumns}
      rows={accessManagement as Row[]}
      isDataLoading={loading}
      onChangePage={(() => {}) as any}
      onChangeRowsPerPage={(() => {}) as any}
      renderCollapsableRow={(rowData: AccessManagement) => <AccessManagementExpandableRow {...rowData} />}
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
      {isHasActiveAccess ? (
        <Typography variant="headerM" sx={{ mb: 0 }}>
          {t('accessManagement')}
        </Typography>
      ) : (
        <Stack direction="row" alignItems="center">
          <ErrorIcon sx={(theme) => ({ fill: theme.palette.error[40], mr: theme.spacing(2.25) })} />
          <Typography variant="headerS" sx={{ mb: 0, color: (theme) => theme.palette.error[40] }}>
            <span>{t('tableView.noActiveAccessManagement')}</span>
          </Typography>
        </Stack>
      )}
    </RichTable>
  );
};
