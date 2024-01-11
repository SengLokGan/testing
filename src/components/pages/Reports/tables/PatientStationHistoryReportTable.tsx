import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  changePatientStationHistoryReportPage,
  changePatientStationHistoryReportRowsPerPage,
  selectPatientStationHistoryReportFilters,
  selectPatientStationHistoryReportLoading,
  selectPatientStationHistoryReportPagination,
  selectPatientStationHistoryReports,
} from '@store/slices';
import { format } from 'date-fns';
import { getPatientStationHistoryReportsColumns } from '@constants/pages';
import { RichTable } from '@components/RichTable';
import theme from '@src/styles/theme';
import Typography from '@mui/material/Typography';
import { PatientStationHistoryReportFilters } from '@components/pages/Reports';
import Box from '@mui/material/Box';

export const PatientStationHistoryReportTable = () => {
  const columns = useMemo(getPatientStationHistoryReportsColumns, []);
  const loading = selectPatientStationHistoryReportLoading();
  const pagination = selectPatientStationHistoryReportPagination();
  const reports = selectPatientStationHistoryReports();
  const filters = selectPatientStationHistoryReportFilters();
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const [tableTitle, setTableTitle] = useState('');

  useEffect(() => {
    setTableTitle(
      reports.length
        ? `${t('patient-station-history-report')} ${filters.fromDate ? format(filters.fromDate, 'dd/MM/yyyy') : ''} ${
            filters.toDate ? format(filters.toDate, 'dd/MM/yyyy') : ''
          } ${filters.patient?.label ?? ''} ${filters.locations?.label ?? ''} ${
            filters.startTime ? format(new Date(filters.startTime), 'hh:mm aa') : ''
          } ${filters.endTime ? format(new Date(filters.endTime), 'hh:mm aa') : ''} (${tCommon('generated')} ${format(
            new Date(),
            'dd/MM/yyyy',
          )})`
        : '',
    );
  }, [reports]);

  return (
    <RichTable
      fullScreen
      multiPagination
      headerDivider
      stickyHeader
      emptyBodyBGColor={theme.palette.background.default}
      columns={columns}
      rows={reports}
      isDataLoading={loading}
      pagination={pagination}
      defaultHeaderContainer={false}
      onChangePage={changePatientStationHistoryReportPage}
      onChangeRowsPerPage={changePatientStationHistoryReportRowsPerPage}
    >
      <PatientStationHistoryReportFilters />
      {reports.length > 0 && (
        <Box
          sx={{
            px: 3,
            py: 2,
            position: 'sticky',
            left: 0,
          }}
        >
          <Typography variant="headerM">{tableTitle}</Typography>
        </Box>
      )}
    </RichTable>
  );
};
