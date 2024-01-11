import Typography from '@mui/material/Typography';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import Stack from '@mui/material/Stack';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters';

type WarningMessageProps = WithSx<{
  text: string;
}>;
export const WarningMessage = ({ text, sx = [] }: WarningMessageProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={[
        {
          bgcolor: '#FFE8DB',
          py: 1.5,
          px: 2,
          width: 1,
          maxWidth: 'max-content',
          mt: 1,
          borderRadius: (theme) => theme.spacing(0.5),
        },
        ...convertSxToArray(sx),
      ]}
    >
      <WarningAmberOutlinedIcon sx={{ color: '#FF9254' }} />
      <Typography variant="labelM">{text}</Typography>
    </Stack>
  );
};
