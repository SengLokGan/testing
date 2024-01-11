import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const TodayInjectionsAreLoading = () => (
  <Stack direction="column" sx={{ width: 1, p: (theme) => theme.spacing(1.5, 3, 0.5, 3) }}>
    <Stack direction="row" sx={{ mb: 2 }}>
      {new Array(5).fill(null).map(() => (
        <Skeleton sx={{ width: 1, height: 25, maxWidth: 150, mr: 1, mb: 1 }} />
      ))}
    </Stack>
    <Skeleton height={100} />
  </Stack>
);
