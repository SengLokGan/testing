import { NephrologistVisitEvent, PICVisitEvent } from '@types';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { getEventTypeColor } from '@components/pages/Schedule/clinicalSchedule/utils/getEventTypeColor';
import { getEventTypeLabel } from '@components/pages/Schedule/clinicalSchedule/components/EventsList/EventsList';
import { format, parse } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import { TargetAudience } from '@enums/components/TargetAudience';

type DoctorReviewEventCardProps = {
  event: PICVisitEvent | NephrologistVisitEvent;
};
export const DoctorReviewEventCard = ({ event }: DoctorReviewEventCardProps) => {
  const { t } = useTranslation('schedule');

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
        {event?.doctor?.name}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={({ spacing, palette, typography }) => ({
            minWidth: '16px',
            height: '16px',
            lineHeight: '16px',
            borderRadius: '8px',
            backgroundColor: getEventTypeColor(event.type),
            fontSize: typography.paragraphXS.fontSize,
            color: palette.text.white,
            fontWeight: typography.fontWeightMedium,
            paddingLeft: spacing(0.5),
            paddingRight: spacing(0.5),
          })}
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
          {t(`events.${event.type}`)}
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
      <Typography variant="paragraphM">{event.comment}</Typography>
      <Typography variant="labelMCapsSB" sx={({ palette }) => ({ color: palette.text.secondary })}>
        {event?.targetAudience === TargetAudience.AllPatients ? t('allPatients') : t('assignedPatients')}
        {event?.dialysisRelated && ` · ${t('dialysisOnly')}`}
      </Typography>
      <Typography variant="labelMCapsSB" sx={({ palette }) => ({ color: palette.text.secondary })}>
        {t('createdBy')}
      </Typography>
      <Stack direction="row">
        <Avatar
          sx={(theme) => ({ mr: 1, width: theme.spacing(4), height: theme.spacing(4) })}
          src={event.createdBy.photoPath ? `${event.createdBy.photoPath}?${uniqid()}` : ''}
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
              src={event.createdBy.photoPath ? `${event.modifiedBy.photoPath}?${uniqid()}` : ''}
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
