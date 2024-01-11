import { getCellStyles } from './AppointmentsStyles';
import { Box, Stack } from '@mui/material';
import { Appointment } from '@components/pages/Schedule/patientsSchedule/components/Appointment/Appointment';
import { AddHocEventTypes, OneDayCalendarAppointment } from '@types';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { addServiceModal } from '@store/slices';
import { ServiceModalName } from '@enums/components';
import { useAppDispatch } from '@hooks/storeHooks';
import { AddServiceModalPlace } from '@enums/components/AddServiceModalPlace';

type AppointmentsProps = {
  slotKey: string;
  shift: string;
  appointments: OneDayCalendarAppointment[];
  isIso: boolean;
};

export const Appointments = ({ slotKey, shift, appointments, isIso }: AppointmentsProps) => {
  const dispatch = useAppDispatch();

  const addHdService = (appointment) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.AddHocServicesModal,
        payload: {
          type: AddHocEventTypes.HD,
          patient: null,
          date: appointment.date,
          shift: appointment.shiftId,
          isolationGroupId: appointment.isolationGroupId,
          place: AddServiceModalPlace.SHIFT,
          procedure: null,
          laboratory: null,
          specimenType: null,
        },
      }),
    );
  };

  return (
    <Box sx={getCellStyles(`${slotKey}_${shift}`)}>
      <Stack direction="column" spacing={'1px'}>
        {appointments.map((appointment) => {
          return appointment.status ? (
            <Appointment key={`${slotKey}-${shift}-${appointment.id}`} appointment={appointment} isIso={isIso} />
          ) : (
            <Button
              data-testid="addHdServiceButton"
              onClick={() => addHdService(appointment)}
              key={`${slotKey}-${shift}-addAppointment`}
              sx={{ justifyContent: 'start', height: '100%', '&:hover': { backgroundColor: 'unset' } }}
            >
              <AddIcon sx={{ color: ({ palette }) => palette.primary.main }} />
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};
