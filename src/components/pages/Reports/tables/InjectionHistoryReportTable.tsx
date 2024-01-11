import { getInjectionReportsTableColumns } from '@constants';
import { RichTable } from '@components';
import Typography from '@mui/material/Typography';
import theme from '@src/styles/theme';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  changeInjectionReportPage,
  changeInjectionReportRowsPerPage,
  selectInjectionReportFilters,
  selectInjectionReportLoading,
  selectInjectionReportPagination,
  selectInjectionReports,
} from '@store/slices';
import { InjectionHistoryReportsFilters } from '@components/pages/Reports';
import Box from '@mui/material/Box';

export const InjectionHistoryReportTable = () => {
  const patientInjectionTableColumns = useMemo(getInjectionReportsTableColumns, []);
  const loading = selectInjectionReportLoading();
  const pagination = selectInjectionReportPagination();
  const filters = selectInjectionReportFilters();
  const reports = selectInjectionReports();
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const [tableTitle, setTableTitle] = useState('');

  useEffect(() => {
    setTableTitle(
      reports.length
        ? `${t('injectionHistory')} ${filters.fromDate ? format(filters.fromDate, 'dd/MM/yyyy') : ''} ${
            filters.toDate ? format(filters.toDate, 'dd/MM/yyyy') : ''
          } ${filters.injection ?? ''} ${filters.patient?.label ?? ''} ${
            filters?.shifts.length > 0
              ? filters.shifts.map((shift) => shift.label).join('_') + '_' + t('table.shift')
              : ''
          } (${tCommon('generated')} ${format(new Date(), 'dd/MM/yyyy')})`
        : '',
    );
  }, [reports]);

  return (
    <RichTable
      fullScreen
      multiPagination
      headerDivider
      stickyHeader
      defaultHeaderContainer={false}
      emptyBodyBGColor={theme.palette.background.default}
      columns={patientInjectionTableColumns}
      rows={reports}
      isDataLoading={loading}
      pagination={pagination}
      onChangePage={changeInjectionReportPage}
      onChangeRowsPerPage={changeInjectionReportRowsPerPage}
    >
      <InjectionHistoryReportsFilters />

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
