import { ReactElement, useRef } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { format } from 'date-fns';
import { addServiceModal, selectAppointmentServices, selectScheduleDate } from '@store/slices';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/global';
import Avatar from '@mui/material/Avatar';
import { dotsTextOverflowStyles } from '@utils/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { DialysisStatus, ServiceModalName, AppointmentEventPlace, UserPermissions } from '@enums';
import { useAppDispatch } from '@hooks/storeHooks';
import { OneDayCalendarAppointment } from '@types';
import { ServicesLoader } from '@components/pages/Schedule/patientsSchedule/components/ServicesLoader/ServicesLoader';
import { ServicesList } from '@components/pages/Schedule/patientsSchedule/components/ServicesList/ServicesList';
import { SERVICES_CARD_WIDTH } from '@components/pages/Schedule/patientsSchedule/components/Appointment/utils';
import { PermissionGuard } from '@guards';

type ServicesCardProps = {
  onClose: () => void;
  appointment: OneDayCalendarAppointment;
  icon: ReactElement;
  timeLeft: number;
};

export const ServicesCard = ({ onClose, appointment, icon, timeLeft }: ServicesCardProps) => {
  const scheduleDate = selectScheduleDate();
  const ref = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const services = selectAppointmentServices();
  const { patientId, patientName, patientPhotoPath, id, previousSkipped, hasEncounter } = appointment;
  const { t } = useTranslation('schedule');

  const openServicesScreen = () => {
    onClose();
    dispatch(
      addServiceModal({
        name: ServiceModalName.DialysisProcedureModal,
        payload: {
          patientId,
          appointmentId: id,
          openOnStep: DialysisStatus.CheckIn,
        },
      }),
    );
  };

  const openSkipAppointmentModal = () => {
    onClose();
    dispatch(
      addServiceModal({
        name: ServiceModalName.SkipAppointmentModal,
        payload: {
          appointmentId: id,
          skipInfo: { previousSkipped },
          skipPlace: AppointmentEventPlace.Scheduler,
        },
      }),
    );
  };

  return (
    <Box sx={{ p: 2, width: SERVICES_CARD_WIDTH }} ref={ref}>
      <Box sx={{ display: 'flex', width: 1 }}>
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Typography sx={(theme) => ({ ml: theme.spacing(3) })}>{format(scheduleDate, 'E')}</Typography>
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
          sx={({ palette }) => ({
            backgroundColor: palette.primary.main,
            width: '32px',
            height: '32px',
            color: palette.primary[100],
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '32px',
          })}
        >
          {format(scheduleDate, 'd')}
        </Box>
      </Stack>
      <Box
        component={Link}
        sx={({ palette }) => ({ display: 'flex', alignItems: 'center', mb: 2, mt: 2, color: palette.primary.main })}
        to={`/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientProfile}`}
      >
        <Avatar
          sx={({ palette, spacing }) => ({
            mr: 1,
            width: spacing(4),
            height: spacing(4),
            backgroundColor: palette.primary.light,
            color: palette.primary.main,
            fontWeight: 500,
          })}
          src={patientPhotoPath ? patientPhotoPath : ''}
        >
          {patientName[0]}
        </Avatar>
        <Typography sx={dotsTextOverflowStyles} variant="labelM">
          {patientName}
        </Typography>
      </Box>

      <Stack direction="column" spacing={2}>
        {!services ? (
          <ServicesLoader />
        ) : (
          <ServicesList
            services={services}
            cardRef={ref.current}
            icon={icon}
            timeLeft={timeLeft}
            onClose={onClose}
            appointment={appointment}
          />
        )}
        <Stack direction="column" spacing={1}>
          <Button
            onClick={openServicesScreen}
            variant="contained"
            sx={({ spacing }) => ({ padding: spacing(1, 2) })}
            data-testid="openServiceScreenButton"
          >
            <Typography variant="labelM">{t('openServicesScreen')}</Typography>
            <OpenInNewIcon fontSize="small" sx={{ color: 'white', ml: 1 }} />
          </Button>
          {!hasEncounter && (
            <PermissionGuard permissions={[UserPermissions.ScheduleEventsModify]}>
              <Button variant="text" onClick={openSkipAppointmentModal}>
                <Typography variant="labelM">{t('skipAppointment')}</Typography>
              </Button>
            </PermissionGuard>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
