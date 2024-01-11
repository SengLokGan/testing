import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const MachineInformationSkeleton = () => {
  return (
    <Stack direction="column" spacing={3} sx={(theme) => ({ p: theme.spacing(3, 2) })}>
      <Skeleton height={200} variant="rectangular" />
      <Skeleton height={200} variant="rectangular" />
      <Skeleton height={200} variant="rectangular" />
    </Stack>
  );
};
