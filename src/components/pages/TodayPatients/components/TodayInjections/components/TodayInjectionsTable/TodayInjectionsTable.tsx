import type { Row, TodayPatientPlannedPatientWithInjections } from '@types';
import { RichTable } from '@components/RichTable';
import { useMemo } from 'react';
import { getTodayInjectionsTableColumns } from '@constants/components/TodayInjectionstTable';
import Box from '@mui/material/Box';

type TodayInjectionsTableProps = {
  data: TodayPatientPlannedPatientWithInjections[];
  isLoading: boolean;
  filters: string[];
};

export const TodayInjectionsTable = ({ data, filters, isLoading }: TodayInjectionsTableProps) => {
  const todayInjectionsTableColumns = useMemo(getTodayInjectionsTableColumns, []);
  const tableData = useMemo(() => {
    return data
      .map(({ injections, ...itemData }) => {
        return {
          ...itemData,
          injections: injections.filter(({ name }) => (filters?.length > 0 ? filters.includes(name) : true)),
        };
      })
      .filter((patient) => patient.injections.length > 0);
  }, [data, filters]);

  return (
    <Box
      sx={{
        '&, & .MuiTableContainer-root': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <RichTable
        fullScreen
        stickyHeader
        headerDivider
        columns={todayInjectionsTableColumns}
        rows={tableData as Row[]}
        isDataLoading={isLoading}
      />
    </Box>
  );
};
