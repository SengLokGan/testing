import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FormDocumentsUpload } from '@components';
import Grid from '@mui/material/Grid';
import { FileTypes } from '@enums';
import { validatorMaxFileCount, validatorMaxFileSize, validatorInfectedFiles } from '@validators';
import { Dispatch, SetStateAction } from 'react';
import { MB } from '@constants/global';
import { selectS3AntivirusErrors } from '@store/slices';
/*
 * TODO: fix type
 * type DocumentUploadProps = {
 *    control: Control<RegisterPatientForm | DocumentsForm>;
 * }
 */

type DocumentUploadProps = {
  control: any;
  setFileLoadingCount: Dispatch<SetStateAction<number>>;
};

const MAX_FILE_SIZE = MB * 5;
const MAX_FILE_SIZE_TEXT = '5 MB';

export const DocumentUpload = ({ control, setFileLoadingCount }: DocumentUploadProps) => {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('patient');
  const infectedFileKeys = selectS3AntivirusErrors();
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Stack spacing={3} direction="column" sx={[isXs && { mt: (theme) => `${theme.spacing(3)} !important` }]}>
      <Box>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={3}
          sx={[
            isXs && {
              '& .MuiGrid-root': {
                pt: 2,
              },
            },
          ]}
        >
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.IdentityDocument}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.nricOrPassport')}
              subLabel={t('modal.fieLimits', { maxFileCount: 3, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={3}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                validate: {
                  maxCount: validatorMaxFileCount(3),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.VirologyStatus}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.virologyFiles')}
              subLabel={t('modal.fieLimits', { maxFileCount: 5, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={5}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                validate: {
                  maxCount: validatorMaxFileCount(5),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.MedicalReport}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.medicalReportsFiles')}
              subLabel={t('modal.fieLimits', { maxFileCount: 5, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={5}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                validate: {
                  maxCount: validatorMaxFileCount(5),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.Consultation}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.consultationFiles')}
              subLabel={t('modal.fieLimits', { maxFileCount: 3, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={3}
              rules={{
                validate: {
                  maxCount: validatorMaxFileCount(3),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.BloodTest}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.bloodTestsFiles')}
              subLabel={t('modal.fieLimits', { maxFileCount: 5, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={5}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                validate: {
                  maxCount: validatorMaxFileCount(5),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.HdPrescription}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.hdPrescriptionFiles')}
              subLabel={t('modal.fieLimits', { maxFileCount: 3, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={3}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                validate: {
                  maxCount: validatorMaxFileCount(3),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormDocumentsUpload
              name={FileTypes.Other}
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.otherFiles')}
              subLabel={t('modal.fieLimits', { maxFileCount: 10, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={10}
              rules={{
                validate: {
                  maxCount: validatorMaxFileCount(10),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
