import { LabOrdersService, ShiftServices } from '@types';
import { Box, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getLabOrderIcon } from '../ServicesList/utils';
import { format } from 'date-fns';
import { selectScheduleDate } from '@store/slices';
import { useTranslation } from 'react-i18next';
import { LabOrderStatus } from '@enums';

type LabOrderServiceProps = {
  labOrder?: LabOrdersService;
  openServicesScreen: () => void;
  shift: ShiftServices;
};

export const LabOrderService = ({ labOrder, openServicesScreen, shift }: LabOrderServiceProps) => {
  const scheduleDate = selectScheduleDate();
  const { t } = useTranslation('schedule');

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
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} sx={{ cursor: 'pointer' }} alignItems="center" onClick={openServicesScreen}>
        <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
          {labOrder?.procedureName!}
        </Typography>
        <OpenInNewIcon sx={({ palette }) => ({ color: palette.primary.main, ml: 1, width: '20px', height: '20px' })} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        {getLabOrderIcon(labOrder?.status!, true)}
        <Typography variant="labelM">{getLabOrderStatusTitle(labOrder?.status!)}</Typography>
        <Box component="span">·</Box>
        <Box component="span" sx={{ backgroundColor: '#9C432E', width: '16px', height: '16px', borderRadius: '50%' }} />
        <Box component="span">{t('labTest')}</Box>
      </Stack>
      <Stack direction="column" spacing={0}>
        <Typography variant="paragraphM">{format(scheduleDate, 'EEEE, MMMM dd, yyyy')}</Typography>
        <Typography variant="paragraphM">{`${shift.name} ${t('shift')}`}</Typography>
      </Stack>
    </Stack>
  );
};
