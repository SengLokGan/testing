import { useEffect, useMemo, useState } from 'react';
import theme from '../../../../styles/theme';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Typography } from '@mui/material';
import { getHospitalizationReportsTableColumns } from '@constants';
import {
  changeHospitalizationReportsPage,
  changeHospitalizationRowsPerPage,
  hospitalizationReportsInitialState,
  selectHospitalizationReports,
  selectHospitalizationReportsFilters,
  selectHospitalizationReportsPagination,
  selectIsLoadingHospitalizationReports,
} from '@store/slices';
import { RichTable } from '@components';
import { HospitalizationReportsFilters } from '@components/pages/Reports';
import Box from '@mui/material/Box';

export const HospitalizationReportsTable = () => {
  const columns = useMemo(getHospitalizationReportsTableColumns, []);
  const loading = selectIsLoadingHospitalizationReports();
  const pagination = selectHospitalizationReportsPagination();
  const filters = selectHospitalizationReportsFilters();
  const reports = selectHospitalizationReports();
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const [tableTitle, setTableTitle] = useState('');

  useEffect(() => {
    const selectedChipsLabels = filters.reasons.reduce(
      (acc: string[], item) => (item.selected ? [...acc, t(`filters.${item.name}`)] : acc),
      [],
    );

    setTableTitle(
      `${t('hospitalizationReport')} ${filters.date ? format(filters.date, 'dd/MM/yyyy') : ''} ${
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
      columns={columns}
      rows={reports}
      isDataLoading={loading}
      pagination={pagination}
      onChangePage={changeHospitalizationReportsPage}
      onChangeRowsPerPage={changeHospitalizationRowsPerPage}
      defaultHeaderContainer={false}
    >
      <HospitalizationReportsFilters />
      {filters !== hospitalizationReportsInitialState.reports.filters && (
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
