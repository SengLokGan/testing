import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import theme from '../../../../styles/theme';
import Typography from '@mui/material/Typography';
import { getMortalityReportsTableColumns } from '@constants';
import {
  changeMortalityReportPage,
  changeMortalityReportRowsPerPage,
  selectMortalityReportFilters,
  selectMortalityReportLoading,
  selectMortalityReportPagination,
  selectMortalityReports,
} from '@store/slices';
import { RichTable } from '@components/RichTable';
import { MortalityReportsFilters } from '@components/pages/Reports';
import Box from '@mui/material/Box';

export const MortalityReportsTable = () => {
  const columns = useMemo(getMortalityReportsTableColumns, []);
  const loading = selectMortalityReportLoading();
  const pagination = selectMortalityReportPagination();
  const filters = selectMortalityReportFilters();
  const reports = selectMortalityReports();
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const [tableTitle, setTableTitle] = useState('');

  useEffect(() => {
    setTableTitle(
      `${t('mortalityReport')} ${format(new Date(), 'dd/MM/yyyy')} ${
        filters?.fromDate ? `${t('filters.fromDate')} ${format(filters.fromDate, 'dd/MM/yyyy')}` : ''
      } ${filters?.toDate ? `${t('filters.toDate')} ${format(filters.toDate, 'dd/MM/yyyy')}` : ''} ${
        filters?.patient ? `${t('filters.patientName')} ${filters.patient.label}` : ''
      } (${tCommon('generated')} ${format(new Date(), 'dd/MM/yyyy')})`,
    );
  }, [reports, filters]);

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
      onChangePage={changeMortalityReportPage}
      onChangeRowsPerPage={changeMortalityReportRowsPerPage}
      defaultHeaderContainer={false}
    >
      <MortalityReportsFilters />
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
