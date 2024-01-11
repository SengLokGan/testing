import { Box } from '@mui/material';
import type { WithSx } from '@types';
import { PropsWithChildren } from 'react';
import { convertSxToArray } from '@utils/converters';

export type CardProps = WithSx<PropsWithChildren<{ isActive: boolean }>>;

export const Card = ({ children, isActive, sx = [] }: CardProps) => {
  return (
    <Box
      sx={[
        ({ spacing, palette }) => ({
          padding: spacing(0.75),
          backgroundColor: palette.primary.light,
          borderLeft: `3px solid ${palette.primary.main}`,
          borderRadius: '4px',
          cursor: 'pointer',
          ...(isActive
            ? {
                border: `3px solid ${palette.primary.main}`,
                paddingTop: '3px',
                paddingBottom: '3px',
              }
            : {}),
        }),
        ...convertSxToArray(sx),
      ]}
    >
      {children}
    </Box>
  );
};
