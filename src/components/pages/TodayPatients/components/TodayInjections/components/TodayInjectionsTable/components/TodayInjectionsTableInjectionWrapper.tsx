import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters';

type TodayInjectionsTableInjectionWrapperProps = PropsWithChildren<WithSx<{}>>;

export const TodayInjectionsTableInjectionWrapper = ({ children, sx }: TodayInjectionsTableInjectionWrapperProps) => (
  <Box
    sx={[
      {
        display: 'flex',
        alignItems: 'center',
        height: '20px',
        mb: 4,
        '&:last-child': { mb: 2 },
      },
      ...convertSxToArray(sx),
    ]}
  >
    {children}
  </Box>
);
