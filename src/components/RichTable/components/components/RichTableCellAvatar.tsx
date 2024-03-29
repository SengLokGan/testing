import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ROUTES } from '@constants';
import { dotsTextOverflowStyles } from '@utils/styles';

interface RichTableCellAvatarProps {
  data: any;
  dotsTextOverflow?: boolean;
}

const RichTableCellAvatar = ({ dotsTextOverflow, data }: RichTableCellAvatarProps) => {
  return (
    <Box
      component={Link}
      sx={{ display: 'flex', alignItems: 'center' }}
      color="primary.main"
      to={data.redirectTo || `/${ROUTES.patientsOverview}/${data.id}/${ROUTES.patientProfile}`}
    >
      <Avatar
        sx={(theme) => ({ mr: 1, width: theme.spacing(4), height: theme.spacing(4) })}
        src={data.photoPath ? data.photoPath : ''}
      >
        {data.name[0]}
      </Avatar>
      <Typography sx={dotsTextOverflow ? dotsTextOverflowStyles : []} variant="labelM">
        {data.name}
      </Typography>
    </Box>
  );
};

export default RichTableCellAvatar;
