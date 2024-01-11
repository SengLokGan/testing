import { Box } from '@mui/material';
import { getIsoNameCellStyles, getIsoHeaderRowStyles } from './IsoGropHeaderStyles';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

type IsoGroupHeaderProps = {
  isoKey: string;
  isoName: string;
  isolations: string[];
};
export const IsoGroupHeader = ({ isoKey, isoName, isolations }: IsoGroupHeaderProps) => {
  const { t } = useTranslation('schedule');
  return (
    <Box sx={getIsoHeaderRowStyles(isoKey)} data-testid={'isoGroupHeader'}>
      <Box sx={getIsoNameCellStyles}>
        {isoName}
        <Tooltip title={isolations.map((isolation) => t(`isolations.${isolation}`)).join(' ')} placement="right">
          <HelpOutlineOutlinedIcon sx={{ ml: 1, cursor: 'pointer' }} />
        </Tooltip>
      </Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};
