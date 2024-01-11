import { ShiftServices, VaccinationServices } from '@types';
import { Box, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getVaccineIcon } from '../ServicesList/utils';
import { format } from 'date-fns';
import { selectScheduleDate } from '@store/slices';
import { useTranslation } from 'react-i18next';
import { VaccinationStatus } from '@enums/global';

type VaccineServiceProps = {
  vaccine?: VaccinationServices;
  openServicesScreen: () => void;
  shift: ShiftServices;
};

export const VaccineService = ({ vaccine, openServicesScreen, shift }: VaccineServiceProps) => {
  const scheduleDate = selectScheduleDate();
  const { t } = useTranslation('schedule');

  const getVaccineStatusTitle = (status) => {
    switch (status) {
      case VaccinationStatus.NotDone:
        return t('statuses.notDone');
      case VaccinationStatus.Pending:
        return t('statuses.pending');
      case VaccinationStatus.AdministeredExternal:
      case VaccinationStatus.AdministeredInternal:
        return t('statuses.administered');
      case VaccinationStatus.Omitted:
        return t('statuses.omitted');
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} sx={{ cursor: 'pointer' }} alignItems="center" onClick={openServicesScreen}>
        <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
          {vaccine?.name!}
        </Typography>
        <OpenInNewIcon sx={({ palette }) => ({ color: palette.primary.main, ml: 1, width: '20px', height: '20px' })} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        {getVaccineIcon(vaccine?.status!, true)}
        <Typography variant="labelM">{getVaccineStatusTitle(vaccine?.status!)}</Typography>
        <Box component="span">·</Box>
        <Box component="span" sx={{ backgroundColor: '#FF9254', width: '16px', height: '16px', borderRadius: '50%' }} />
        <Box component="span">{t('vaccination')}</Box>
      </Stack>
      <Stack direction="column" spacing={0}>
        <Typography variant="paragraphM">{format(scheduleDate, 'EEEE, MMMM dd, yyyy')}</Typography>
        <Typography variant="paragraphM">{`${shift.name} ${t('shift')}`}</Typography>
      </Stack>
    </Stack>
  );
};
