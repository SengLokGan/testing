import { RichTable } from '@components';
import { getMedicationsViewTableColumns } from '@constants';
import { MedicationsExpandableRow, MedicationsExpandableRowProps } from '@components/pages/PatientProfile';
import { exportMedication, selectMedications, selectMedicationsLoading } from '@store';
import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { UserPermissions } from '@enums/store';
import { PermissionGuard } from '@guards/PermissionGuard';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';

export const MedicationsTable = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { t } = useTranslation('medications');
  const { t: tCommon } = useTranslation('common');
  const medicationsList = selectMedications();
  const loading = selectMedicationsLoading();
  const medicationsViewTableColumns = useMemo(getMedicationsViewTableColumns, []);
  const preparedMedicationsList = medicationsList.map((medication) => ({
    ...medication,
    medicationName: medication.medication.name,
  }));

  const printMedicationHandler = () => id && dispatch(exportMedication(id));

  return (
    <RichTable
      fullScreen
      stickyHeader
      collapsableRow
      headerDivider
      columns={medicationsViewTableColumns}
      rows={preparedMedicationsList}
      isDataLoading={loading}
      renderCollapsableRow={(rowData: MedicationsExpandableRowProps) => <MedicationsExpandableRow {...rowData} />}
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
          {t('tableView.medications')}
        </Typography>
        <PermissionGuard permissions={UserPermissions.MedicationView}>
          <Button onClick={printMedicationHandler} variant="outlined" data-testid="printMedicationButton">
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
