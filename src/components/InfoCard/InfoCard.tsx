import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { WithSx } from '@types';
import { PropsWithChildren } from 'react';
import { convertSxToArray } from '@utils/converters/mui';

type InfoCardProps = PropsWithChildren<
  WithSx<{
    title?: string | null;
  }>
>;
export const InfoCard = ({ title, children, sx = [] }: InfoCardProps) => {
  return (
    <Paper sx={[{ p: 3 }, ...convertSxToArray(sx)]} data-testid={`${title}_InfoCard`}>
      {title && (
        <Typography variant="headerM" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};
