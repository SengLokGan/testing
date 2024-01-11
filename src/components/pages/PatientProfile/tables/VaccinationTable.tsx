import { RichTable } from '@components/RichTable/RichTable';
import { getVaccinationViewTableColumns } from '@constants';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { exportVaccination, selectVaccinations, selectVaccinationsLoading } from '@store/slices';
import { VaccinationsExpandableRow, VaccinationsExpandableRowProps } from '@components/pages/PatientProfile';
import { Button, Stack } from '@mui/material';
import { UserPermissions } from '@enums/store';
import { PermissionGuard } from '@guards/PermissionGuard';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useAppDispatch } from '@hooks/storeHooks';

export const VaccinationTable = () => {
  const dispatch = useAppDispatch();
  const loading = selectVaccinationsLoading();
  const { id } = useParams();
  const { t } = useTranslation('vaccination');
  const { t: tCommon } = useTranslation('common');
  const columns = useMemo(() => getVaccinationViewTableColumns(), []);
  const vaccinations = selectVaccinations();

  const printVaccinationHandler = () => {
    id && dispatch(exportVaccination(id));
  };

  if (id) {
    return (
      <RichTable
        stickyHeader
        fullScreen
        collapsableRow
        columns={columns}
        rows={vaccinations}
        headerDivider
        isDataLoading={loading}
        renderCollapsableRow={(rowData: VaccinationsExpandableRowProps) => <VaccinationsExpandableRow {...rowData} />}
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
          <Typography variant="headerM" sx={{ mb: 0 }}>
            {t('tableView.vaccination')}
          </Typography>
          <PermissionGuard permissions={UserPermissions.VaccinationView}>
            <Button onClick={printVaccinationHandler} variant="outlined" data-testid="printVaccinationButton">
              <Stack direction="row" spacing={1}>
                <Typography variant="labelL">{tCommon('button.print')}</Typography>
                <LocalPrintshopOutlinedIcon sx={({ palette }) => ({ color: palette.primary.main })} />
              </Stack>
            </Button>
          </PermissionGuard>
        </Stack>
      </RichTable>
    );
  }
  return null;
};
