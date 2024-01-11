import { RichTable } from '@components/RichTable/RichTable';
import { Column } from '@types';
import Stack from '@mui/material/Stack';
import { LabSummaryFilters } from '@components/pages/PatientProfile/subPages';

interface LabResultsViewTableProps {
  data: any[];
  columns: Column[];
  preColumns?: Column[];
  nextColumns?: Column[];
  isLoading?: boolean;
}

export const LabResultsViewTable = ({
  data,
  columns,
  preColumns,
  nextColumns,
  isLoading = false,
}: LabResultsViewTableProps) => {
  return (
    <RichTable
      fullScreen
      headerDivider
      stickyHeader
      columns={columns}
      rows={data}
      isDataLoading={isLoading}
      preColumns={preColumns}
      nextColumns={nextColumns}
      defaultHeaderContainer={false}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{
          px: 3,
          py: 2,
          position: 'sticky',
          left: 0,
        }}
      >
        <LabSummaryFilters dataLength={data.length} />
      </Stack>
    </RichTable>
  );
};
