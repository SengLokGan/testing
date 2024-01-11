import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import type { Patient } from '@types';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { InfoModal, StyledPatientRowStack } from '@components';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { mainInfoFields, mobileMainInfoFields } from '@constants';
import { convertSxToArray, getCodeValueFromCatalog, getTimeFromDate } from '@utils';
import { PatientStatuses } from '@enums';
import { useState } from 'react';
import Box from '@mui/material/Box';

type MainInfoProps = {
  patient: Partial<Patient>;
};

export const MainInfoView = ({ patient }: MainInfoProps) => {
  const { t } = useTranslation('patient');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const isWalkInStatus = patient.status === PatientStatuses.Walk_In;
  const isDischargedStatus = patient.status === PatientStatuses.Discharged;
  const isDeadStatus = patient.status === PatientStatuses.Dead;

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const showFieldValue = (field: string, sx: any = []) => {
    switch (field) {
      case 'photo':
        return (
          <Avatar
            sx={[
              (theme) => ({
                width: theme.spacing(8),
                height: theme.spacing(8),
                bgcolor: theme.palette.primary[90],
                cursor: 'pointer',
              }),
              ...convertSxToArray(sx),
            ]}
            src={!isWalkInStatus && !isDeadStatus && patient?.photoPath ? patient.photoPath : ''}
            alt="avatar"
            onClick={() => setIsAvatarModalOpen(true)}
          >
            <Typography variant="headerXL" sx={(theme) => ({ color: theme.palette.primary.main })}>
              {patient && patient.name && patient.name[0]}
            </Typography>
          </Avatar>
        );
      case 'document':
        return <Typography variant="labelM">{patient?.document?.number}</Typography>;
      case 'gender':
        if (!patient?.gender?.code) {
          return (
            <Typography variant="labelM" sx={{ flex: 1 }}>
              —
            </Typography>
          );
        }
        return (
          <Typography variant="labelM">
            {patient?.gender?.code !== 'other'
              ? getCodeValueFromCatalog('gender', patient?.gender?.code!)
              : patient.gender.extValue}
          </Typography>
        );
      case 'language':
        if (!patient?.language?.code) {
          return (
            <Typography variant="labelM" sx={{ flex: 1 }}>
              —
            </Typography>
          );
        }
        return (
          <Typography variant="labelM">
            {patient?.language?.code !== 'other'
              ? getCodeValueFromCatalog('language', patient?.language?.code!)
              : patient.language.extValue}
          </Typography>
        );
      case 'birthdate':
        return <Typography variant="labelM">{getTimeFromDate(patient?.dateBirth, 'm') ?? '—'}</Typography>;
      case 'phone':
        if (patient?.phone?.countryCode) {
          return (
            <a href={`tel:${patient?.phone?.countryCode} ${patient?.phone?.number}`}>
              <Typography variant="labelM">{`${patient?.phone?.countryCode} ${patient?.phone?.number}`}</Typography>
            </a>
          );
        }
        return <Typography variant="labelM">—</Typography>;
      case 'address':
        return (
          <Typography variant="labelM" sx={{ flex: 1 }}>
            {patient &&
              patient.address &&
              `${patient.address.houseFlat}, ${patient.address.street}, ${patient.address.city}${
                patient.address.district?.length ? ', ' + patient.address.district : ''
              }${patient.address.state?.length ? ', ' + patient.address.state : ''}, ${getCodeValueFromCatalog(
                'country',
                patient.address.countryIso,
              )}, ${patient.address.postalCode}`}
          </Typography>
        );
      case 'educationLevel':
      case 'occupation':
      case 'race':
      case 'nationality':
      case 'religion':
        if (!patient?.[field]) {
          return (
            <Typography variant="labelM" sx={{ flex: 1 }}>
              —
            </Typography>
          );
        }
        return (
          <Typography variant="labelM" sx={{ flex: 1 }}>
            {getCodeValueFromCatalog(field, patient?.[field]!)}
          </Typography>
        );
      default:
        return (
          <Typography variant="labelM" sx={{ flex: 1 }}>
            {patient?.[field] ? patient?.[field] : '—'}
          </Typography>
        );
    }
  };

  return (
    <>
      <InfoModal
        isOpen={isAvatarModalOpen}
        title={t('profile.patientPhoto')}
        onClose={() => setIsAvatarModalOpen(false)}
      >
        <Box sx={{ py: 3, px: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Avatar
            sx={(theme) => ({
              width: theme.spacing(30),
              height: theme.spacing(30),
              bgcolor: theme.palette.primary[90],
            })}
            src={patient?.photoPath ? patient.photoPath : ''}
            alt="big avatar"
          >
            <Typography sx={(theme) => ({ fontSize: theme.spacing(13.5), color: theme.palette.primary.main })}>
              {patient && patient.name && patient.name[0]}
            </Typography>
          </Avatar>
        </Box>
      </InfoModal>
      <Stack direction="column" spacing={1}>
        {isXs && (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              {showFieldValue('photo', {
                mr: 1,
                width: (theme) => theme.spacing(4),
                height: (theme) => theme.spacing(4),
              })}
              {showFieldValue('name')}
            </Box>
            {mobileMainInfoFields.map((field) => {
              if ((isWalkInStatus || isDeadStatus || isDischargedStatus) && !patient?.[field]) return null;

              return (
                <StyledPatientRowStack
                  direction="row"
                  sx={{
                    flexWrap: 'wrap',
                    '& > :first-child': { flexBasis: '100%', textAlign: 'start' },
                    '& > :last-child': { flexBasis: '100%', ml: 0 },
                  }}
                  spacing={2}
                  key={field}
                >
                  <Typography variant="labelM">{t(`profile.${field}`)}</Typography>
                  {showFieldValue(field)}
                </StyledPatientRowStack>
              );
            })}
          </>
        )}
        {!isXs &&
          mainInfoFields.map((field) => {
            if ((isWalkInStatus || isDeadStatus || isDischargedStatus) && !patient?.[field]) return null;
            return (
              <StyledPatientRowStack direction="row" spacing={2} key={field}>
                <Typography variant="labelM">{t(`profile.${field}`)}</Typography>
                {showFieldValue(field)}
              </StyledPatientRowStack>
            );
          })}
      </Stack>
    </>
  );
};
