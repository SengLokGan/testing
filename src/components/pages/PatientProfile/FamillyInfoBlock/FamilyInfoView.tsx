import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import type { Patient } from '@types';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { StyledPatientRowStack } from '@components';
import Typography from '@mui/material/Typography';
import { familyInfoFields } from '@constants';
import { getCodeValueFromCatalog } from '@utils';

type FamilyInfoProps = {
  patient: Partial<Patient>;
};

export const FamilyInfoView = ({ patient }: FamilyInfoProps) => {
  const { t } = useTranslation('patient');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const getFieldValue = (field: string) => {
    if (field === 'maritalStatus')
      return patient?.family?.maritalStatus
        ? getCodeValueFromCatalog('maritalStatus', patient.family.maritalStatus)
        : '—';
    if (field === 'childCount') return patient?.family?.childCount ?? '—';
  };

  return (
    <Stack direction="column" spacing={1}>
      {familyInfoFields.map((field) => (
        <StyledPatientRowStack
          direction="row"
          spacing={2}
          key={field}
          sx={[
            isXs && {
              flexWrap: 'wrap',
              '& > :first-child': { flexBasis: '100%', textAlign: 'start' },
              '& > :last-child': { flexBasis: '100%', ml: 0 },
            },
          ]}
        >
          <Typography variant="labelM">{t(`profile.${field}`)}</Typography>
          <Typography variant="labelM" sx={{ flex: 1 }}>
            {getFieldValue(field)}
          </Typography>
        </StyledPatientRowStack>
      ))}
      {patient?.family?.kins?.map((kin, index) => (
        <StyledPatientRowStack
          direction="row"
          spacing={2}
          key={kin.name}
          sx={[
            isXs && {
              flexWrap: 'wrap',
              '& > :first-child': { flexBasis: '100%', textAlign: 'start' },
              '& > :last-child': { flexBasis: '100%', ml: 0 },
            },
          ]}
        >
          <Typography variant="labelM">{`${t(`profile.nextOfKin`)} ${index + 1}`}</Typography>
          <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
            <Stack direction="column" sx={(theme) => ({ width: `calc(50% - ${theme.spacing(0.5)})` })}>
              <Typography variant="labelM">{kin.name}</Typography>
              <Typography variant="paragraphM" sx={(theme) => ({ color: theme.palette.text.secondary })}>
                {kin.relationship}
              </Typography>
            </Stack>
            <a href={`tel:${patient?.phone?.countryCode} ${patient?.phone?.number}`}>
              <Typography variant="labelM">{`${kin?.phone?.countryCode} ${kin?.phone?.number}`}</Typography>
            </a>
          </Stack>
        </StyledPatientRowStack>
      ))}
    </Stack>
  );
};
