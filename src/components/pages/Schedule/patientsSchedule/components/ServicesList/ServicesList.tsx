import { useEffect, ReactElement, useState, useRef } from 'react';
import { ActiveService, OneDayCalendarAppointment, ShortServices } from '@types';
import { Box, IconButton, Popover, Stack, Typography } from '@mui/material';
import { ServiceModalName } from '@enums/components';
import { Card } from '@components/pages/Schedule/patientsSchedule/components/ServicesList/Card';
import { addServiceModal } from '@store/slices';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAppDispatch } from '@hooks/storeHooks';
import { HemodialysisService } from '@components/pages/Schedule/patientsSchedule/components/HemodialysisService/HemodialysisService';
import { MedicationService } from '@components/pages/Schedule/patientsSchedule/components/MedicationService/MedicationService';
import { LabOrderService } from '@components/pages/Schedule/patientsSchedule/components/LabOrderService/LabOrderService';
import { VaccineService } from '@components/pages/Schedule/patientsSchedule/components/VaccineService/VaccineService';
import {
  getLabOrderIcon,
  getMedicationIcon,
  getVaccineIcon,
} from '@components/pages/Schedule/patientsSchedule/components/ServicesList/utils';
import { ServicesType } from '@enums/components/ServicesType';
import { ServiceDotMenu } from '@components/pages/Schedule/patientsSchedule/components/ServiceDotMenu/ServiceDotMenu';
import { HDProgressInfo } from '@components/pages/Schedule/patientsSchedule/components/HDProgressInfo/HDProgressInfo';

type ServicesListProps = {
  services: ShortServices;
  cardRef: HTMLElement | null;
  icon: ReactElement;
  timeLeft: number;
  onClose: () => void;
  appointment: OneDayCalendarAppointment;
};

export const POPUP_WIDTH = 336;
export const ServicesList = ({ services, cardRef, icon, timeLeft, onClose, appointment }: ServicesListProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeService, setActiveService] = useState<ActiveService | null>(null);
  const { patientId, id: appointmentId } = appointment;
  const dispatch = useAppDispatch();
  const hemodialysisCardRef = useRef<HTMLElement>(null);
  const medicationCardRefs = useRef<HTMLElement[]>([]);
  const labOrderCardRefs = useRef<HTMLElement[]>([]);
  const vaccineCardRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    services && cardRef && cardRef.scrollIntoView();
  }, [services]);

  const onServiceClick = ({ type, index, id }: { type: ServicesType; index?: number; id?: number }) => {
    switch (type) {
      case ServicesType.Medication:
        setAnchorEl(medicationCardRefs.current[index!]);
        break;
      case ServicesType.LabOrder:
        setAnchorEl(labOrderCardRefs.current[index!]);
        break;
      case ServicesType.Vaccine:
        setAnchorEl(vaccineCardRefs.current[index!]);
        break;
      default:
        setAnchorEl(hemodialysisCardRef.current);
    }
    setActiveService({ type, id });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setActiveService(null);
  };

  const openServicesScreen = () => {
    setAnchorEl(null);
    onClose();
    dispatch(
      addServiceModal({
        name: ServiceModalName.DialysisProcedureModal,
        payload: { patientId, appointmentId },
      }),
    );
  };

  const getPopoverPosition = () => {
    let rightWidth = POPUP_WIDTH;

    if (anchorEl) {
      rightWidth = document.documentElement.clientWidth - anchorEl.getBoundingClientRect().right;
    }

    return {
      anchorOrigin: {
        vertical: 'top',
        horizontal: rightWidth >= POPUP_WIDTH ? 'right' : 'left',
      },
      transformOrigin: {
        horizontal: rightWidth >= POPUP_WIDTH ? 'left' : 'right',
        vertical: 'top',
      },
      sx: {
        '& .MuiPaper-root': {
          borderRadius: '16px',
          transform: `translate(${rightWidth >= POPUP_WIDTH ? 20 : -24}px, -4px) !important`,
        },
      },
    } as const;
  };

  const getPopoverContent = () => {
    if (activeService) {
      switch (true) {
        case activeService.type === ServicesType.Hemodialysis:
          return (
            <HemodialysisService
              hemodialysis={services.hemodialysis}
              openServicesScreen={openServicesScreen}
              shift={services.shift}
              icon={icon}
              timeLeft={timeLeft}
            />
          );
        case activeService.type === ServicesType.Medication:
          return (
            <MedicationService
              medication={services.medications?.find((medication) => medication.id === activeService?.id)}
              openServicesScreen={openServicesScreen}
              shift={services.shift}
            />
          );
        case activeService.type === ServicesType.LabOrder:
          return (
            <LabOrderService
              labOrder={services.labOrders?.find((labOrder) => labOrder.id === activeService?.id)}
              openServicesScreen={openServicesScreen}
              shift={services.shift}
            />
          );
        case activeService.type === ServicesType.Vaccine:
          return (
            <VaccineService
              vaccine={services.vaccines?.find((vaccine) => vaccine.id === activeService?.id)}
              openServicesScreen={openServicesScreen}
              shift={services.shift}
            />
          );
      }
    }
    return null;
  };

  return (
    <>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handlePopoverClose} {...getPopoverPosition()}>
        <Box sx={{ p: 2, width: `${POPUP_WIDTH - 16}px` }}>
          <Stack justifyContent="end" direction="row">
            <ServiceDotMenu activeService={activeService} onClose={onClose} appointment={appointment} />
            <IconButton
              onClick={handlePopoverClose}
              sx={{
                m: 0,
                p: 0,
                '&:hover': { backgroundColor: 'unset' },
              }}
              data-testid="closeModalButton"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          {getPopoverContent()}
        </Box>
      </Popover>
      <Stack spacing={0.25}>
        <Card isActive={activeService?.type === ServicesType.Hemodialysis}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={() => onServiceClick({ type: ServicesType.Hemodialysis })}
            ref={hemodialysisCardRef as any}
          >
            <HDProgressInfo
              status={appointment.status}
              duration={appointment.duration}
              startTime={appointment.startTime}
              timeLeft={timeLeft}
            />
          </Stack>
        </Card>
        {services.medications &&
          services.medications.map((medication, index) => (
            <Card
              key={medication.id}
              isActive={activeService?.type === ServicesType.Medication && activeService?.id === medication.id}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                ref={(el: HTMLDivElement) => (medicationCardRefs.current[index] = el)}
                onClick={() => onServiceClick({ type: ServicesType.Medication, index, id: medication.id })}
              >
                {getMedicationIcon(medication.status)}
                <Typography variant="labelM">{medication.name}</Typography>
              </Stack>
            </Card>
          ))}
        {services.labOrders &&
          services.labOrders.map((labOrder, index) => (
            <Card
              key={labOrder.id}
              isActive={activeService?.type === ServicesType.LabOrder && activeService?.id === labOrder.id}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                ref={(el: HTMLDivElement) => (labOrderCardRefs.current[index] = el)}
                onClick={() => onServiceClick({ type: ServicesType.LabOrder, index, id: labOrder.id })}
              >
                {getLabOrderIcon(labOrder.status)}
                <Typography variant="labelM">{labOrder.procedureName}</Typography>
              </Stack>
            </Card>
          ))}
        {services.vaccines &&
          services.vaccines.map((vaccine, index) => (
            <Card
              key={vaccine.id}
              isActive={activeService?.type === ServicesType.Vaccine && activeService?.id === vaccine.id}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                ref={(el: HTMLDivElement) => (vaccineCardRefs.current[index] = el)}
                onClick={() => onServiceClick({ type: ServicesType.Vaccine, index, id: vaccine.id })}
              >
                {getVaccineIcon(vaccine.status)}
                <Typography variant="labelM">{vaccine.name}</Typography>
              </Stack>
            </Card>
          ))}
      </Stack>
    </>
  );
};
