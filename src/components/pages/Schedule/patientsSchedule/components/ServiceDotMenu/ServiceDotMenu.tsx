import { useCallback, useState, useMemo } from 'react';
import { PermissionGuard } from '@guards/PermissionGuard';
import { UserPermissions } from '@enums/store';
import { ServicesType } from '@enums/components/ServicesType';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { addServiceModal } from '@store/slices';
import { ServiceModalName } from '@enums/components';
import { AppointmentEventPlace } from '@enums/global';
import { useAppDispatch } from '@hooks/storeHooks';
import { ActiveService, OneDayCalendarAppointment } from '@types';
import { useTranslation } from 'react-i18next';

type ServiceDotMenuProps = {
  activeService: ActiveService | null;
  onClose: () => void;
  appointment: OneDayCalendarAppointment;
};
export const ServiceDotMenu = ({ activeService, onClose, appointment }: ServiceDotMenuProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('schedule');
  const { id, previousSkipped, hasEncounter } = appointment;
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const onMenuOpen = useCallback((event) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);

  const onOpenSkipAppointmentModal = () => {
    setMenuAnchorEl(null);
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

  const openRescheduleModal = () => {
    setMenuAnchorEl(null);
    onClose();
    dispatch(
      addServiceModal({
        name: ServiceModalName.RescheduleModal,
        payload: {
          appointmentId: id,
          activeService,
        },
      }),
    );
  };

  const menuOptions = useMemo(() => {
    switch (activeService?.type) {
      case ServicesType.Hemodialysis:
        if (!hasEncounter) {
          return (
            <>
              <MenuItem data-testid="skipAppointmentButton" onClick={onOpenSkipAppointmentModal}>
                {t('skipAppointment')}
              </MenuItem>
              <MenuItem data-testid="rescheduleAppointmentButton" onClick={() => openRescheduleModal()}>
                {t('rescheduleAppointment')}
              </MenuItem>
            </>
          );
        }
        break;
      case ServicesType.Medication:
        if (!hasEncounter) {
          return (
            <MenuItem data-testid="rescheduleMedicationButton" onClick={() => openRescheduleModal()}>
              {t('rescheduleAppointment')}
            </MenuItem>
          );
        }
        break;
      case ServicesType.Vaccine:
        if (!hasEncounter) {
          return (
            <MenuItem data-testid="rescheduleVaccineButton" onClick={() => openRescheduleModal()}>
              {t('rescheduleAppointment')}
            </MenuItem>
          );
        }
        break;
      default:
        return null;
    }
  }, [activeService, hasEncounter]);

  if (!menuOptions) {
    return null;
  }

  return (
    <PermissionGuard permissions={UserPermissions.ScheduleEventsModify}>
      <IconButton data-testid="serviceDotMenuButton" onClick={onMenuOpen} sx={{ mr: 1 }}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={() => setMenuAnchorEl(null)}>
        {menuOptions}
      </Menu>
    </PermissionGuard>
  );
};
