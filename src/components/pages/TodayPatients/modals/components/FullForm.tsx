import { useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import { MainInformation, MainInformationProps } from './MainInformation';
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';
import { Address } from './Address';
import { FamilyInformation } from './FamilyInformation';
import { DocumentUpload } from './DocumentUpload';
import { AdditionalComments } from './AdditionalComment';
import { PatientStatuses } from '@enums';
import { RegisterPatientForm } from '@types';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

type FullFormProps = {
  control: Control<RegisterPatientForm>;
  watch: UseFormWatch<RegisterPatientForm>;
  patientStatus: PatientStatuses;
  register: UseFormRegister<RegisterPatientForm>;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
} & Pick<MainInformationProps, 'currentPhoto' | 'setCurrentPhoto'>;

export const FullForm = ({
  control,
  watch,
  patientStatus,
  register,
  setFileLoadingCount,
  ...restProps
}: FullFormProps) => {
  const { t } = useTranslation('patient');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Stack spacing={6} direction="column" data-testid="fullRegisterForm">
      <MainInformation
        control={control}
        watch={watch}
        patientStatus={patientStatus}
        register={register}
        {...restProps}
      />
      <AdditionalComments control={control} />
      <Address control={control} />
      <Typography variant="headerM">{t('modal.familyInformation')}</Typography>
      <FamilyInformation control={control} watch={watch} register={register} />
      <Typography variant="headerM" sx={[isXs && { mt: (theme) => `${theme.spacing(2)} !important` }]}>
        {t('modal.documentsUpload')}
      </Typography>
      <DocumentUpload control={control} setFileLoadingCount={setFileLoadingCount} />
    </Stack>
  );
};
