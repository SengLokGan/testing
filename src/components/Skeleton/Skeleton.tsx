import Skeleton from '@mui/material/Skeleton';

type SkeletonProps = {
  height: number;
};

export const SkeletonWrapper = ({ height }: SkeletonProps) => {
  return <Skeleton variant="rectangular" height={height} sx={{ borderRadius: '4px' }} />;
};
