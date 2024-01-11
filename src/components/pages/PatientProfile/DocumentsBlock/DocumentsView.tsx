import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { StyledPatientRowStack, FileLink } from '@components';
import Typography from '@mui/material/Typography';
import { documentsFields } from '@constants';
import type { FileDocument } from '@types';
import { selectPatientId } from '@store';
import { FileTypes } from '@enums';

type DocumentsViewProps = {
  documents: FileDocument[];
};

export const DocumentsView = ({ documents }: DocumentsViewProps) => {
  const { t } = useTranslation('patient');
  const patientId = selectPatientId();
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const getFieldName = (fieldName: string) => {
    switch (fieldName) {
      case FileTypes.IdentityDocument:
        return 'documentCopy';
      case FileTypes.VirologyStatus:
        return 'virologyStatus';
      case FileTypes.MedicalReport:
        return 'medicalReport';
      case FileTypes.Consultation:
        return 'consultation';
      case FileTypes.BloodTest:
        return 'bloodTest';
      case FileTypes.HdPrescription:
        return 'hdPrescription';
      default:
        return 'otherFiles';
    }
  };

  const fieldsData = documents.reduce((acc, file) => {
    const currentField = getFieldName(file.type);
    if (acc[currentField]) {
      return { ...acc, [currentField]: [...acc[currentField], file] };
    }
    return { ...acc, [currentField]: [file] };
  }, {});

  return (
    <Stack direction="column" spacing={1}>
      {documentsFields.map((field) => (
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
          <Typography variant="labelM" sx={{ alignSelf: 'start' }}>
            {t(`profile.${field}`)}
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: 1, maxWidth: ({ spacing }) => `calc(100% - ${spacing(18.75)})` }}
          >
            {fieldsData[field] ? (
              fieldsData[field]?.map((file: FileDocument) => (
                <FileLink patientId={patientId} key={file.id} file={file} />
              ))
            ) : (
              <Typography variant="labelM">—</Typography>
            )}
          </Stack>
        </StyledPatientRowStack>
      ))}
    </Stack>
  );
};
