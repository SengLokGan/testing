import { getVascularAccessReportsTableColumns } from '@constants';
import { RichTable } from '@components';
import Typography from '@mui/material/Typography';
import {
  changeVascularAccessReportsPage,
  changeVascularAccessReportsRowsPerPage,
  selectPagination,
  selectVascularAccessReports,
  selectVascularAccessFilters,
  selectVascularAccessReportsLoading,
  vascularAccessInitialState,
} from '@store/slices/reports/vascularAccessReportsSlice';
import theme from '@src/styles/theme';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { VascularAccessReportsFilters } from '@components/pages/Reports';
import Box from '@mui/material/Box';

export const VascularAccessReportsTable = () => {
  const vascularAccessReportsTableColumns = useMemo(getVascularAccessReportsTableColumns, []);
  const loading = selectVascularAccessReportsLoading();
  const pagination = selectPagination();
  const filters = selectVascularAccessFilters();
  const reports = selectVascularAccessReports();
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const { t: tVAReports } = useTranslation('vascularAccessReports');
  const [tableTitle, setTableTitle] = useState('');

  useEffect(() => {
    const allChipsFilters = [...filters.accessTypes, ...filters.categories];

    const selectedChipsLabels = allChipsFilters.reduce(
      (acc: string[], item) => (item.selected ? [...acc, tVAReports(`filters.${item.name}`)] : acc),
      [],
    );

    setTableTitle(
      `${t('vascularAccessReport')} ${filters.date ? format(filters.date, 'dd/MM/yyyy') : ''} ${
        selectedChipsLabels.length ? selectedChipsLabels.join(' ') : ''
      } (${tCommon('generated')} ${format(new Date(), 'dd/MM/yyyy')})`,
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
      columns={vascularAccessReportsTableColumns}
      rows={reports}
      isDataLoading={loading}
      pagination={pagination}
      onChangePage={changeVascularAccessReportsPage}
      onChangeRowsPerPage={changeVascularAccessReportsRowsPerPage}
    >
      <VascularAccessReportsFilters />
      {filters !== vascularAccessInitialState.reports.filters && (
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
