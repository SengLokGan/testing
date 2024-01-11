import { Button, Stack } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectScheduleDate, setScheduleDate } from '@store/slices/schedules/patientsScheduleSlice';
import { FilterDatepicker } from '@components/pages/TodayPatients';
import { useAppDispatch } from '@hooks/storeHooks';
import { subDays, addDays } from 'date-fns';
import { ROUTES } from '@constants/global';
import { useEffect } from 'react';

export const DateControl = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('schedule');
  const scheduleDate = selectScheduleDate();
  const dispatch = useAppDispatch();

  const setDate = (date = new Date()) => dispatch(setScheduleDate(date));
  const increaseDay = () => dispatch(setScheduleDate(addDays(scheduleDate, 1)));
  const decreaseDay = () => dispatch(setScheduleDate(subDays(scheduleDate, 1)));

  useEffect(() => {
    return () => {
      setDate();
    };
  }, []);

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
        data-testid="schedulePatientsNavigateToBackButton"
        onClick={() => navigate(`/${ROUTES.schedule}`)}
      >
        <ArrowBackOutlinedIcon />
      </IconButton>
      <FilterDatepicker date={scheduleDate} onChange={setDate} />
      <Button variant="outlined" onClick={() => setDate()} data-testid="schedulePatientsNavigateTodayButton">
        {t('today')}
      </Button>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={decreaseDay} data-testid="schedulePatientsNavigateBackButton">
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={increaseDay} data-testid="schedulePatientsNavigateForwardButton">
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
