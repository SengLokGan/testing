import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface RichTableCellCheckboxProps {
  checked: boolean;
  onRowSelect?: () => void;
  data: any;
  fullData: any;
}

const RichTableCellCheckbox = ({ checked, onRowSelect, data, fullData }: RichTableCellCheckboxProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Checkbox
        checked={checked}
        onChange={onRowSelect}
        sx={{ p: 0, borderRadius: 0 }}
        // @ts-ignore
        inputProps={{ 'data-testid': `TableCellCheckbox-${fullData.id}` }}
      />
      <Typography variant="paragraphM">{data}</Typography>
    </Stack>
  );
};

export default RichTableCellCheckbox;
