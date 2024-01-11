import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { addServiceModal, selectScheduleDate } from '@store/slices';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/global';
import Avatar from '@mui/material/Avatar';
import uniqid from 'uniqid';
import { dotsTextOverflowStyles } from '@utils/styles';
import { IndividualLabTestPlanEvent, IndividualLabTestPlanEventLabOrder } from '@types';
import { Card } from '../ServicesList/Card';
import { getLabOrderIcon } from '../ServicesList/utils';
import { ServiceModalName } from '@enums/components';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { POPUP_WIDTH } from '@components/pages/Schedule/patientsSchedule/components/ServicesList/ServicesList';
import { DialysisStatus, LabOrderStatus } from '@enums/global';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  getPopoverPosition,
  getPopoverStyle,
} from '@components/pages/Schedule/patientsSchedule/components/Appointment/utils';

type IndividualLabTestServicesProps = {
  onClose: () => void;
  event: IndividualLabTestPlanEvent;
};
export const IndividualLabTestCard = ({ onClose, event }: IndividualLabTestServicesProps) => {
  const scheduleDate = selectScheduleDate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeService, setActiveService] = useState<IndividualLabTestPlanEventLabOrder | null>(null);
  const labOrderCardRefs = useRef<HTMLElement[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('schedule');

  const onLabTestClick = (index) => {
    setAnchorEl(labOrderCardRefs.current[index]);
    setActiveService(event.labOrders[index]);
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
        payload: {
          patientId: event.patientId,
          appointmentId: event.id,
          openOnStep: DialysisStatus.CheckIn,
        },
      }),
    );
  };

  const getLabOrderStatusTitle = (status: LabOrderStatus) => {
    switch (status) {
      case LabOrderStatus.TO_PERFORM:
        return t('statuses.toPerform');
      case LabOrderStatus.TO_SUBMIT:
        return t('statuses.toSubmit');
      case LabOrderStatus.PENDING:
        return t('statuses.pendingResult');
      case LabOrderStatus.COMPLETED:
        return t('statuses.receivedResult');
    }
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        {...getPopoverPosition(anchorEl)}
        sx={getPopoverStyle(anchorEl)}
      >
        <Box sx={{ p: 2, width: `${POPUP_WIDTH - 16}px` }}>
          <Stack justifyContent="end" direction="row">
            <IconButton
              onClick={handlePopoverClose}
              sx={{ m: 0, p: 0, '&:hover': { backgroundColor: 'unset' } }}
              data-testid="closeModalButton"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
              {activeService?.procedureName!}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            {getLabOrderIcon(activeService?.status!, true)}
            <Typography variant="labelM">{getLabOrderStatusTitle(activeService?.status!)}</Typography>
            <Box component="span">·</Box>
            <Box
              component="span"
              sx={{ backgroundColor: '#9C432E', width: '16px', height: '16px', borderRadius: '50%' }}
            />
            <Box component="span">{t('labTest')}</Box>
          </Stack>
          <Typography variant="paragraphM">{format(scheduleDate, 'EEEE, MMMM dd, yyyy')}</Typography>
          <Typography variant="paragraphM">{t('allDay')}</Typography>
        </Box>
      </Popover>
      <Stack direction="column" spacing={1}>
        <Stack justifyContent="center" direction="row" sx={{ mt: -3 }}>
          <Typography>{format(scheduleDate, 'E')}</Typography>
        </Stack>
        <Stack justifyContent="center" direction="row">
          <Box
            sx={({ palette, typography }) => ({
              backgroundColor: palette.primary.main,
              width: '32px',
              height: '32px',
              color: palette.primary[100],
              borderRadius: '50%',
              textAlign: 'center',
              lineHeight: typography.headerL.lineHeight,
            })}
          >
            {format(scheduleDate, 'd')}
          </Box>
        </Stack>
        <Box
          component={Link}
          sx={({ palette }) => ({ display: 'flex', alignItems: 'center', mb: 2, mt: 2, color: palette.primary.main })}
          to={`/${ROUTES.patientsOverview}/${event.patientId}/${ROUTES.patientProfile}`}
        >
          <Avatar
            sx={({ palette, spacing, typography }) => ({
              mr: 1,
              width: spacing(4),
              height: spacing(4),
              backgroundColor: palette.primary.light,
              color: palette.primary.main,
              fontWeight: typography.headerM.fontWeight,
            })}
            src={event?.patientPhotoPath ? `${event.patientPhotoPath}?${uniqid()}` : ''}
          >
            {event.patientName[0]}
          </Avatar>
          <Typography sx={dotsTextOverflowStyles} variant="labelM">
            {event.patientName}
          </Typography>
        </Box>
        <Stack direction="column" spacing={0.25}>
          {event.labOrders &&
            event.labOrders.map((labOrder, index) => (
              <Card key={labOrder.id} isActive={activeService?.id === labOrder.id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  ref={(el: HTMLDivElement) => (labOrderCardRefs.current[index] = el)}
                  onClick={() => onLabTestClick(index)}
                >
                  {getLabOrderIcon(labOrder.status)}
                  <Typography variant="labelM">{labOrder.procedureName}</Typography>
                </Stack>
              </Card>
            ))}
        </Stack>
        <Button
          onClick={openServicesScreen}
          variant="contained"
          sx={({ spacing }) => ({ padding: spacing(1, 2) })}
          data-testid="openServiceScreenButton"
        >
          <Typography variant="labelM">{t('openServicesScreen')}</Typography>
          <OpenInNewIcon fontSize="small" sx={({ palette }) => ({ color: palette.primary[100], ml: 1 })} />
        </Button>
      </Stack>
    </>
  );
};
