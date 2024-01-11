import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { getEventTypeColor } from '@components/pages/Schedule/clinicalSchedule/utils/getEventTypeColor';
import { format, parse } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { QuarterlyBloodTestEvent } from '@types';
import { getEventTypeLabel } from '@components/pages/Schedule/clinicalSchedule/components/EventsList/EventsList';
import { useTranslation } from 'react-i18next';

type QuarterlyBloodTestCardProps = {
  event: QuarterlyBloodTestEvent;
};

export const QuarterlyBloodTestCard = ({ event }: QuarterlyBloodTestCardProps) => {
  const { t } = useTranslation('schedule');

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
        {t('events.QUARTERLY_BLOOD_TEST')}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            minWidth: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: getEventTypeColor(event.type),
          }}
        >
          {getEventTypeLabel(event.type)}
        </Box>
        <Typography
          variant="labelM"
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {t('labTest')}
        </Typography>
      </Stack>
      <Stack direction="column">
        <Typography variant="paragraphM">{format(new Date(event.date), 'EEEE, LLLL d, yyyy')}</Typography>
        <Typography variant="paragraphM">
          {event.isAllDay
            ? t('allDay')
            : `${format(new Date(parse(event.startTime!, 'HH:mm:ss', new Date())), 'hh:mm a')} - ${format(
                new Date(parse(event.endTime!, 'HH:mm:ss', new Date())),
                'hh:mm a',
              )}`}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="labelM">{`${t('laboratory')}:`}</Typography>
        <Typography variant="paragraphM">{`${event.lab.name}`}</Typography>
      </Stack>
      <Typography variant="paragraphM">{event.comment}</Typography>
      <Typography variant="labelMCapsSB" sx={({ palette }) => ({ color: palette.text.secondary })}>
        {t('createdBy')}
      </Typography>
      <Stack direction="row">
        <Avatar
          sx={(theme) => ({ mr: 1, width: theme.spacing(4), height: theme.spacing(4) })}
          src={event.createdBy.photoPath ? event.createdBy.photoPath : ''}
        >
          {event.createdBy.name[0]}
        </Avatar>
        <Stack direction="column">
          <Box component={Link} to={''} color="primary.main">
            <Typography variant="labelM">{event.createdBy.name}</Typography>
          </Box>
          <Typography variant="paragraphS" sx={({ palette }) => ({ color: palette.neutralVariant[50] })}>
            {format(new Date(event.createdAt), 'dd/MM/yyyy hh:mm a')}
          </Typography>
        </Stack>
      </Stack>
      {event.modifiedBy && (
        <>
          <Typography variant="labelMCapsSB" sx={({ palette }) => ({ color: palette.text.secondary })}>
            {t('editedBy')}
          </Typography>
          <Stack direction="row">
            <Avatar
              sx={(theme) => ({ mr: 1, width: theme.spacing(4), height: theme.spacing(4) })}
              src={event.createdBy.photoPath ? event.modifiedBy.photoPath : ''}
            >
              {event.modifiedBy.name[0]}
            </Avatar>
            <Stack direction="column">
              <Box component={Link} to={''} color="primary.main">
                <Typography variant="labelM">{event.modifiedBy.name}</Typography>
              </Box>
              <Typography variant="paragraphS" sx={({ palette }) => ({ color: palette.neutralVariant[50] })}>
                {format(new Date(event.modifiedAt!), 'dd/MM/yyyy hh:mm a')}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};
