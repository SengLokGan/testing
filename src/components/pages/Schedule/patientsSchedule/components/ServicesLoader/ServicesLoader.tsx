import { Stack } from '@mui/material';
import { SkeletonWrapper as Skeleton } from '@components/Skeleton/Skeleton';
import React from 'react';

export const ServicesLoader = () => (
  <Stack spacing={0.25}>
    <Skeleton height={36} />
    <Skeleton height={36} />
    <Skeleton height={36} />
  </Stack>
);
