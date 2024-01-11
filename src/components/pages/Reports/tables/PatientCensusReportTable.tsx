import { getPatientCensusReportsTableColumns } from '@constants';
import { RichTable } from '@components';
import Typography from '@mui/material/Typography';
import theme from '@src/styles/theme';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import {
  changePatientCensusReportPage,
  changePatientCensusReportRowsPerPage,
  patientCensusInitialState,
  selectPatientCensusFilters,
  selectPatientCensusReports,
  selectPatientCensusReportsLoading,
  selectPatientCensusReportsPagination,
} from '@store/slices/reports/patientCensusReportsSlice';
import { format } from 'date-fns';
import { PatientCensusReportsFilters } from '@components/pages/Reports';
import Box from '@mui/material/Box';

export const PatientCensusReportTable = () => {
  const patientCensusReportTableColumns = useMemo(getPatientCensusReportsTableColumns, []);
  const loading = selectPatientCensusReportsLoading();
  const pagination = selectPatientCensusReportsPagination();
  const filters = selectPatientCensusFilters();
  const reports = selectPatientCensusReports();
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const [tableTitle, setTableTitle] = useState('');

  useEffect(() => {
    const allChipsFilters = [...filters.statuses, ...filters.isolations];
    const selectedChipsLabels = allChipsFilters.reduce(
      (acc: string[], item) => (item.selected ? [...acc, item.name] : acc),
      [],
    );
    setTableTitle(
      `${t('patientCensusReport')} ${filters.date ? format(filters.date, 'dd/MM/yyyy') : ''} ${
        selectedChipsLabels.length ? selectedChipsLabels.join('_') : ''
      } (${tCommon('generated')} ${format(new Date(), 'dd/MM/yyyy')})`,
    );
  }, [reports]);

  return (
    <RichTable
      fullScreen
      multiPagination
      headerDivider
      stickyHeader
      emptyBodyBGColor={theme.palette.background.default}
      columns={patientCensusReportTableColumns}
      rows={reports}
      defaultHeaderContainer={false}
      isDataLoading={loading}
      pagination={pagination}
      onChangePage={changePatientCensusReportPage}
      onChangeRowsPerPage={changePatientCensusReportRowsPerPage}
    >
      <PatientCensusReportsFilters />
      {filters !== patientCensusInitialState.reports.filters && (
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
