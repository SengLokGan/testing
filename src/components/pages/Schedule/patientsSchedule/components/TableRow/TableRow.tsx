import { Box } from '@mui/material';
import { getSlotsStyles, getRowStyles } from './TableRowStyles';
import { Appointments } from '@components/pages/Schedule/patientsSchedule/components/Appointments/Appointments';
import { SlotData } from '@types';

type TableRowProps = {
  isIsoGroup: boolean;
  shiftCount: number;
  slotKey: string;
  index: number;
  rowData: SlotData;
  isoKey: string;
};
export const TableRow = ({ isIsoGroup, shiftCount, slotKey, index, rowData, isoKey }: TableRowProps) => {
  const rowTemplateAreaString = ({ slotKey, row }) => {
    return `"${slotKey} ${slotKey}_past ${Object.keys(row)
      .map((shift) => `${slotKey}_${shift}`)
      .join(' ')} ${slotKey}_future"`;
  };

  return (
    <Box
      sx={getRowStyles({
        isIsoGroup,
        isoKey,
        slotKey,
        shiftCount,
        templateArea: rowTemplateAreaString({ slotKey, row: rowData }),
      })}
      data-testid={isIsoGroup ? 'isolationRow' : 'nonIsolationRow'}
    >
      <Box sx={getSlotsStyles}>{`${index + 1}`.padStart(2, '0')}</Box>
      <Box />
      {Object.keys(rowData).map((shift) => (
        <Appointments
          key={`${slotKey}-${shift}`}
          slotKey={slotKey}
          shift={shift}
          appointments={rowData[shift]}
          isIso={isIsoGroup}
        />
      ))}
      <Box />
    </Box>
  );
};
