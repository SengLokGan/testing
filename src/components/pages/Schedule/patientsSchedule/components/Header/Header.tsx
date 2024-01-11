import { selectShifts } from '@store/slices';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { parse, format, isValid } from 'date-fns';
import {
  getContainerStyle,
  getTimeLineCellStyle,
  getPastFutureCellStyle,
  getTimeLabelStyle,
  getShiftsCellStyle,
  getShiftNameStyle,
} from './HeaderStyles';

export const Header = () => {
  const { t } = useTranslation('schedule');
  const shifts = selectShifts();

  const getTimeString = (time) => {
    if (!time) return '';
    const dateTime = parse(time, 'HH:mm:ss', new Date());
    return isValid(dateTime) ? format(dateTime, 'HH:mm a') : '';
  };

  return (
    <Box sx={getContainerStyle(shifts.length)} data-testid="scheduleHeader">
      <Box sx={getTimeLineCellStyle}>{t('timeline')}</Box>
      <Box sx={getPastFutureCellStyle}>
        <Typography variant="labelXXS" sx={getTimeLabelStyle}>
          {getTimeString(shifts[0].timeStart)}
        </Typography>
      </Box>
      {shifts.map((shift) => (
        <Box sx={getShiftsCellStyle} key={shift.id}>
          <Typography variant="labelXXS" sx={getShiftNameStyle}>
            {`${shift.name} ${t('shift')}`}
          </Typography>
          <Typography variant="labelXXS" sx={getTimeLabelStyle}>
            {getTimeString(shift.timeEnd)}
          </Typography>
        </Box>
      ))}
      <Box sx={getPastFutureCellStyle}></Box>
    </Box>
  );
};
