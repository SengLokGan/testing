import { MedicationServices, ShiftServices } from '@types';
import { Box, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getMedicationIcon } from '../ServicesList/utils';
import { format } from 'date-fns';
import { selectScheduleDate } from '@store/slices';
import { useTranslation } from 'react-i18next';
import { VaccinationMedicationResolution } from '@enums/global';

type MedicationServiceProps = {
  medication?: MedicationServices;
  openServicesScreen: () => void;
  shift: ShiftServices;
};

export const MedicationService = ({ medication, openServicesScreen, shift }: MedicationServiceProps) => {
  const scheduleDate = selectScheduleDate();
  const { t } = useTranslation('schedule');

  const getMedicationStatusTitle = (status: VaccinationMedicationResolution | undefined) => {
    switch (status) {
      case VaccinationMedicationResolution.Administered:
        return t('statuses.administered');
      case VaccinationMedicationResolution.Omitted:
      case VaccinationMedicationResolution.Rescheduled:
        return t('statuses.omitted');
      default:
        return t('statuses.pending');
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} sx={{ cursor: 'pointer' }} alignItems="center" onClick={openServicesScreen}>
        <Typography variant="headerM" sx={({ palette }) => ({ color: palette.primary.main })}>
          {medication?.name!}
        </Typography>
        <OpenInNewIcon sx={({ palette }) => ({ color: palette.primary.main, ml: 1, width: '20px', height: '20px' })} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        {getMedicationIcon(medication?.status, true)}
        <Typography variant="labelM">{getMedicationStatusTitle(medication?.status)}</Typography>
        <Box component="span">·</Box>
        <Box component="span" sx={{ backgroundColor: '#006D3C', width: '16px', height: '16px', borderRadius: '50%' }} />
        <Box component="span">{t('medication')}</Box>
      </Stack>
      <Stack direction="column" spacing={0}>
        <Typography variant="paragraphM">{format(scheduleDate, 'EEEE, MMMM dd, yyyy')}</Typography>
        <Typography variant="paragraphM">{`${shift.name} ${t('shift')}`}</Typography>
      </Stack>
    </Stack>
  );
};
