import { Stack } from '@mui/material';
import { StackBlock } from '@components/StackBlock/StackBlock';
import { schedulePatients } from '@constants/pages/Scedule';

export const Schedule = () => {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={2}
      sx={({ spacing }) => ({ width: 1, padding: spacing(2, 3) })}
    >
      <StackBlock cards={schedulePatients} />
    </Stack>
  );
};
