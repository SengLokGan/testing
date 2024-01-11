import type { WithSx } from '@types';
import type { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { convertSxToArray } from '@utils/converters';

type HorizontalScrollContainerProps = WithSx<
  PropsWithChildren<{
    nowrap?: boolean;
  }>
>;

export const HorizontalScrollContainer = ({ nowrap = false, sx = [], children }: HorizontalScrollContainerProps) => {
  return (
    <Box
      data-testid="horizontalScrollContainer"
      sx={[
        {
          display: 'flex',
          width: 1,
          overflowY: 'hidden',
          overflowX: 'auto',
          whiteSpace: nowrap ? 'nowrap' : 'initial',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
        },
        ...convertSxToArray(sx),
      ]}
    >
      {children}
    </Box>
  );
};
