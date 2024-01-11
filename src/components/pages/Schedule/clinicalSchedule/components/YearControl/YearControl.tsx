import { Button, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ROUTES } from '@constants/global';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { selectClinicalScheduleDate, setClinicalScheduleDate } from '@store/slices';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import { addYears, subYears, getYear } from 'date-fns';
import Typography from '@mui/material/Typography';

export const YearControl = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('schedule');
  const scheduleDate = selectClinicalScheduleDate();
  const dispatch = useAppDispatch();

  const setDate = (date = new Date()) => dispatch(setClinicalScheduleDate(date));
  const decreaseYear = () => dispatch(setClinicalScheduleDate(subYears(scheduleDate, 1)));
  const increaseYear = () => dispatch(setClinicalScheduleDate(addYears(scheduleDate, 1)));

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={3}
      sx={({ spacing }) => ({
        width: 1,
        p: `${spacing(1.25)} ${spacing(3)}`,
      })}
    >
      <IconButton
        sx={{ p: 0 }}
        data-testid="scheduleClinicsNavigateToBackButton"
        onClick={() => navigate(`/${ROUTES.schedule}`)}
      >
        <ArrowBackOutlinedIcon />
      </IconButton>
      <Typography variant="labelL">{getYear(scheduleDate)}</Typography>

      <Button variant="outlined" onClick={() => setDate()} data-testid="scheduleClinicNavigateTodayButton">
        {t('today')}
      </Button>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={decreaseYear} data-testid="scheduleClinicNavigateBackButton">
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={increaseYear} data-testid="scheduleClinicNavigateForwardButton">
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
