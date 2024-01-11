import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import type { ClinicalInfoResponse } from '@types';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { clinicalInfoFields } from '@constants';
import { StyledPatientRowStack, VirologyChip } from '@components';
import Typography from '@mui/material/Typography';
import { getCodeValueFromCatalog, getPatientVirologyStatus } from '@utils';
import { AllergyChipItem } from '@components/pages/PatientProfile';
import { AllergiesInfo, Treatment } from '@enums';

type ClinicalInfoProps = {
  clinicalInfo: ClinicalInfoResponse;
};

export const ClinicalInfoView = ({ clinicalInfo }: ClinicalInfoProps) => {
  const { t } = useTranslation('patient');
  const { hasVirus, virology } = getPatientVirologyStatus(clinicalInfo?.virology);
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const getTreatmentName = (name: Treatment) => {
    if (name === Treatment.Hemodialysis) return t('profile.hemodialysis');
    if (name === Treatment.Conservative) return t('profile.conservative');
    if (name === Treatment.IPD) return t('profile.ipd');
    return t('profile.card');
  };

  const showFieldValue = (field: string) => {
    switch (field) {
      case 'drugAllergy':
        return (
          <>
            {clinicalInfo?.allergy?.type === AllergiesInfo.Allergy ? (
              <Stack
                direction="row"
                spacing={0.25}
                sx={{
                  flex: 1,
                  flexWrap: 'wrap',
                  '& .MuiChip-root': {
                    mb: 0.25,
                  },
                  '& .MuiChip-root:last-of-type, .MuiChip-root:first-of-type': {
                    ml: 0.25,
                  },
                }}
              >
                {clinicalInfo?.allergy?.values.map((allergyItem) => (
                  <AllergyChipItem name={allergyItem.name} key={allergyItem.name} />
                ))}
              </Stack>
            ) : (
              <Typography variant="labelM">
                {t(
                  `profile.${
                    clinicalInfo?.allergy?.type === AllergiesInfo.NoInfo ? 'noInfoAboutAllergy' : 'noKnownAllergy'
                  }`,
                )}
              </Typography>
            )}
          </>
        );
      case 'virology':
        return (
          <>
            {hasVirus ? (
              <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: 'center' }}>
                {virology.map((virus) => {
                  if (clinicalInfo?.virology?.[virus] !== 'reactive') return null;
                  return <VirologyChip key={virus} name={virus} />;
                })}
              </Stack>
            ) : (
              <Typography variant="labelM">{t('profile.nonInfectious')}</Typography>
            )}
          </>
        );
      case 'hbsab':
        return <Typography variant="labelM">{clinicalInfo?.virology?.hbsab || 'N.A.'}</Typography>;
      case 'currentTreatment':
        return <Typography variant="labelM">{getTreatmentName(clinicalInfo?.treatment!)}</Typography>;
      case 'bloodType':
        return <Typography variant="labelM">{getCodeValueFromCatalog(field, clinicalInfo?.bloodType!)}</Typography>;
      default:
        return (
          <Typography variant="labelM" sx={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            {clinicalInfo?.[field] ? clinicalInfo?.[field] : '—'}
          </Typography>
        );
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      {clinicalInfoFields.map((field) => (
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
          {showFieldValue(field)}
        </StyledPatientRowStack>
      ))}
    </Stack>
  );
};
