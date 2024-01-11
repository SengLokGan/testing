import { SERVICES_CARD_WIDTH } from '@components/pages/Schedule/patientsSchedule/components/Appointment/utils';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton, Typography } from '@mui/material';
import { format, isToday, isBefore } from 'date-fns';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { PermissionGuard } from '@guards/PermissionGuard';
import { UserPermissions } from '@enums/store';
import { EventsList } from '@components/pages/Schedule/clinicalSchedule/components/EventsList/EventsList';
import { ClinicalEvent } from '@types';
import { addServiceModal } from '@store/slices';
import { ServiceModalName } from '@enums/components';
import { useAppDispatch } from '@hooks/storeHooks';
import { getTenantStartCurrentDay } from '@utils/getTenantDate';
import { useSearchParams } from 'react-router-dom';
import { TargetAudience } from '@enums/components/TargetAudience';

type EventsCardProps = {
  onClose: () => void;
  date: Date;
  events: ClinicalEvent[];
};
export const EventsCard = ({ onClose, date, events }: EventsCardProps) => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useTranslation('schedule');
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeEventId = searchParams.get('activeEventId');

  useEffect(() => {
    return () => {
      if (activeEventId) {
        searchParams.delete('activeEventId');
        searchParams.delete('date');
        setSearchParams(searchParams);
      }
    };
  }, [activeEventId]);

  const addEvent = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.AddClinicalEventModal,
        payload: {
          date,
          type: undefined,
          isAllDay: true,
          title: '',
          laboratory: null,
          startTime: null,
          endTime: null,
          comment: '',
          targetAudience: TargetAudience.AssignedPatients,
          dialysisRelated: true,
        },
      }),
    );
    onClose();
  };

  if (!date) {
    return null;
  }

  return (
    <Box sx={{ p: 2, width: SERVICES_CARD_WIDTH }} ref={ref}>
      <Box sx={{ display: 'flex', width: 1 }}>
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Typography sx={(theme) => ({ ml: theme.spacing(3) })}>{format(date, 'E')}</Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            m: 0,
            p: 0,
            '&:hover': { backgroundColor: 'unset' },
          }}
          data-testid="closePopupButton"
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Stack justifyContent="center" direction="row">
        <Box
          sx={({ palette, typography }) => ({
            backgroundColor: isToday(date) ? palette.primary.light : 'unset',
            width: '32px',
            height: '32px',
            color: palette.primary[10],
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: typography.headerL.lineHeight,
            fontWeight: typography.labelL.fontWeight,
            fontSize: typography.labelL.fontSize,
          })}
        >
          {format(date, 'd')}
        </Box>
      </Stack>
      <Stack direction="column" sx={{ mt: 1 }}>
        {events.length ? (
          <EventsList events={events} onClose={onClose} date={date} />
        ) : (
          <Typography variant="labelM">{t('noEvents')}</Typography>
        )}
      </Stack>
      <PermissionGuard permissions={[UserPermissions.ClinicalScheduleSuitModify]}>
        <Button
          variant="contained"
          onClick={addEvent}
          disabled={isBefore(date, getTenantStartCurrentDay())}
          sx={({ spacing }) => ({
            padding: `${spacing(1)} ${spacing(2)}`,
            marginTop: spacing(1),
            width: '100%',
          })}
          data-testid="addEventButton"
        >
          <AddIcon sx={{ color: 'white', mr: 1, width: '20px', height: '20px' }} />
          <Typography variant="labelM">{t('addEvent')}</Typography>
        </Button>
      </PermissionGuard>
    </Box>
  );
};
