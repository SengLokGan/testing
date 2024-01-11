import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { dotsTextOverflowStyles } from '@utils';
import { ROUTES } from '@constants';

type DialysisMachineNameColumnProps = PropsWithChildren<{
  id: number | string;
}>;

export const DialysisMachineNameColumn = ({ id, children }: DialysisMachineNameColumnProps) => {
  return (
    <Box
      component={Link}
      sx={{ display: 'flex', alignItems: 'center' }}
      color="primary.main"
      to={`${id}/${ROUTES.dialysisMachineInformation}`}
    >
      <Typography sx={dotsTextOverflowStyles} variant="labelM">
        {children}
      </Typography>
    </Box>
  );
};
