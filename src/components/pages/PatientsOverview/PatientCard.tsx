import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { VirologyChip, StyledPatientRowStack } from '@components';
import { useTranslation } from 'react-i18next';
import { ClientOverviewPatient } from '@types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';
import Box from '@mui/material/Box';

type PatientCardProps = {
  patient: ClientOverviewPatient;
};

export const PatientCard = ({
  patient: { name, document, gender, isolation, access, treatments, hdSchedule },
}: PatientCardProps) => {
  const { t } = useTranslation('patient');

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Stack direction="column" spacing={2}>
        <Box
          component={Link}
          sx={{ display: 'flex', alignItems: 'center' }}
          color="primary.main"
          to={`/${ROUTES.patientsOverview}/${name.id}/${ROUTES.patientProfile}`}
        >
          <Avatar
            sx={(theme) => ({ mr: 1, width: theme.spacing(4), height: theme.spacing(4) })}
            src={name?.photoPath ? name.photoPath : ''}
          >
            {name.name[0]}
          </Avatar>
          <Typography
            variant="labelL"
            color="primary"
            sx={{
              textOverflow: 'ellipsis',
              display: 'block',
              overflow: 'hidden',
            }}
          >
            {name.name}
          </Typography>
        </Box>
        <StyledPatientRowStack direction="row" spacing={2} width={13}>
          <Typography variant="labelM">{t('profile.document')}</Typography>
          <Typography variant="labelM">{document ? document : '—'}</Typography>
        </StyledPatientRowStack>
        <StyledPatientRowStack direction="row" spacing={2} width={13}>
          <Typography variant="labelM">{t('profile.gender')}</Typography>
          <Typography variant="labelM">{gender ? gender : '—'}</Typography>
        </StyledPatientRowStack>
        <StyledPatientRowStack direction="row" spacing={2} width={13}>
          <Typography variant="labelM">{t('table.access')}</Typography>
          <Typography variant="labelM">{access ?? 'N.A.'}</Typography>
        </StyledPatientRowStack>
        <StyledPatientRowStack direction="row" spacing={2} width={13}>
          <Typography variant="labelM">{t('table.hdSchedule')}</Typography>
          <Typography variant="labelM">{hdSchedule ?? '—'}</Typography>
        </StyledPatientRowStack>
        <StyledPatientRowStack direction="row" spacing={2} width={13}>
          <Typography variant="labelM">{t('table.treatments')}</Typography>
          <Typography variant="labelM">{treatments ?? '—'}</Typography>
        </StyledPatientRowStack>
        <StyledPatientRowStack direction="row" spacing={2} width={13}>
          <Typography variant="labelM" sx={{ flexShrink: 0, pt: 0.5 }}>
            {t('profile.isolation')}
          </Typography>
          {isolation && isolation.length > 0 ? (
            <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap' }}>
              {isolation.map((virus) => (
                <VirologyChip key={virus} name={virus} />
              ))}
            </Stack>
          ) : (
            <Typography variant="labelM">—</Typography>
          )}
        </StyledPatientRowStack>
      </Stack>
    </Paper>
  );
};
