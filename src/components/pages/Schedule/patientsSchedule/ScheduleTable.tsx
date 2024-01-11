import { Header } from '@components/pages/Schedule/patientsSchedule/components/Header/Header';
import { Table } from '@components/pages/Schedule/patientsSchedule/components/Table/Table';
import { Box } from '@mui/material';

export const ScheduleTable = () => {
  return (
    <Box
      data-testid="patientsScheduleTable"
      sx={() => ({
        height: 1,
        overflow: 'auto',
      })}
    >
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '52px 1fr',
          gridTemplateAreas: '"header" "main"',
          minWidth: '1000px',
        }}
      >
        <Header />
        <Table />
      </Box>
    </Box>
  );
};
