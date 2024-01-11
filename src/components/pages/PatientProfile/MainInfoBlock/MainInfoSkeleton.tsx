import { SkeletonWrapper as Skeleton } from '@components';
import Stack from '@mui/material/Stack';

export const MainInfoSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton height={60} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={40} />
    </Stack>
  );
};
