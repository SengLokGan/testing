import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { subYears } from 'date-fns';
import {
  FormDatePicker,
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FormPhoneInput,
  FormAutocomplete,
} from '@components';
import { useTranslation } from 'react-i18next';
import emptyPatientUploadIcon from '@assets/emptyPatientUpload.svg';
import { PatientStatuses, InputTextType } from '@enums';
import { Dictionaries, getOptionListFromCatalog, getTenantEndCurrentDay } from '@utils';
import { latinLettersNumeralsReg, latinLettersSpecialCharactersReg, latinLettersSpecialSymbolsReg } from '@src/regexp';
import Avatar from '@mui/material/Avatar';
import { UploadPhotoModal, UploadPhotoModalProps, UploadPhotoModalStep } from '@components/pages/PatientProfile';
import { useEffect, useState } from 'react';
import { validatorMinYearAgo, validatorIsValidDate, validatorFutureDate } from '@validators';
import { MainInfoForm } from '@types';

/* TODO: fix type
 * type MainInformationProps = {
 *    control: Control<RegisterPatientForm | MainInfoForm>;
 *    watch: UseFormWatch<RegisterPatientForm | MainInfoForm>;
 *    register: UseFormRegister<RegisterPatientForm | MainInfoForm>;
 *    patientStatus: PatientStatuses;
 *    defaultCountryCode?: string;
 * };
 */

export type MainInformationProps = {
  control: any;
  watch: any;
  register: any;
  patientStatus: PatientStatuses;
  currentPhoto?: string | null;
  defaultValues?: MainInfoForm;
} & Partial<Pick<UploadPhotoModalProps, 'setCurrentPhoto'>>;

export const OTHERS = 'other';

export const MainInformation = ({
  control,
  watch,
  register,
  currentPhoto,
  setCurrentPhoto,
  patientStatus,
  defaultValues,
}: MainInformationProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const idType = watch('documentType', 'NRIC');
  const genderWatch = watch('genderCode');
  const languageCodeWatch = watch('languageCode');
  const defaultCountryCode = defaultValues?.phoneCountryCode;
  const phoneCountryCode = watch('phoneCountryCode', defaultCountryCode) ?? defaultCountryCode;
  const isFullForm =
    patientStatus !== PatientStatuses.Walk_In &&
    patientStatus !== PatientStatuses.Discharged &&
    patientStatus !== PatientStatuses.Dead;
  const [isUploadPhotoModalOpen, setIsUploadPhotoModalOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [languageCode, setLanguageCode] = useState('');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (defaultValues) {
      !genderWatch && setGender(defaultValues.genderCode);
      !languageCodeWatch && setLanguageCode(defaultValues.languageCode);
    }
    genderWatch && setGender(genderWatch);
    languageCodeWatch && setLanguageCode(languageCodeWatch);
  }, [defaultValues, genderWatch, languageCodeWatch]);

  const getIdTypePlaceholder = () => {
    if (!idType) return 'modal.nric';
    return idType !== 'NRIC' ? 'modal.passportNumber' : 'modal.nric';
  };

  return (
    <>
      {isUploadPhotoModalOpen && setCurrentPhoto && (
        <UploadPhotoModal
          setCurrentPhoto={setCurrentPhoto}
          currentPhoto={currentPhoto}
          step={currentPhoto ? UploadPhotoModalStep.ChangePhoto : UploadPhotoModalStep.AddPhoto}
          isOpen={isUploadPhotoModalOpen}
          onClose={() => setIsUploadPhotoModalOpen(false)}
        />
      )}
      <Stack spacing={2} direction="column">
        {isFullForm && (
          <Avatar
            sx={(theme) => ({
              width: theme.spacing(12.5),
              height: theme.spacing(12.5),
              bgcolor: theme.palette.primary[90],
              cursor: 'pointer',
            })}
            onClick={() => setIsUploadPhotoModalOpen(true)}
            src={currentPhoto ?? emptyPatientUploadIcon}
            alt="avatar"
          />
        )}
        <FormInputText
          control={control}
          name="name"
          textType={InputTextType.Capitalize}
          label={t('modal.patientName')}
          required
          rules={{
            required: { value: true, message: tCommon('validation.required') },
            minLength: { value: 1, message: tCommon('validation.length', { min: 1, max: 256 }) },
            maxLength: { value: 256, message: tCommon('validation.length', { min: 1, max: 256 }) },
            pattern: { value: latinLettersSpecialSymbolsReg, message: tCommon('validation.name') },
          }}
          sx={(theme) => ({ maxWidth: { xs: '100%', sm: theme.spacing(42) } })}
        />
        {isFullForm && (
          <>
            <Stack spacing={2} direction="row" flexWrap={isXs ? 'wrap' : 'nowrap'}>
              <FormInputSelect
                options={getOptionListFromCatalog(Dictionaries.Genders)}
                control={control}
                name="genderCode"
                label={t('modal.gender')}
                required
                sx={[
                  isXs && {
                    flexBasis: '100%',
                    mb: gender === OTHERS ? 2 : 0,
                  },
                  !isXs && {
                    maxWidth: (theme) => theme.spacing(42),
                  },
                ]}
                rules={{
                  required: { value: true, message: tCommon('validation.required') },
                }}
              />
              {gender === OTHERS && (
                <FormInputText
                  control={control}
                  name="genderExtValue"
                  required
                  label={t('modal.genderDetails')}
                  rules={{
                    required: { value: true, message: tCommon('validation.required') },
                    minLength: { value: 4, message: tCommon('validation.length', { min: 4, max: 30 }) },
                    maxLength: { value: 30, message: tCommon('validation.length', { min: 4, max: 30 }) },
                    pattern: { value: latinLettersSpecialCharactersReg, message: tCommon('validation.name') },
                  }}
                  sx={[
                    isXs && {
                      flexBasis: '100%',
                      ml: '0 !important',
                    },
                  ]}
                  data-testid="addPatientGenderInput"
                />
              )}
            </Stack>
            <FormDatePicker
              control={control}
              name="dateBirth"
              label={t('modal.birthdate')}
              required
              sx={(theme) => ({ maxWidth: { xs: '100%', sm: theme.spacing(42) } })}
              maxDate={getTenantEndCurrentDay()}
              minDate={subYears(getTenantEndCurrentDay(), 120)}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                validate: {
                  isValid: validatorIsValidDate,
                  minDate: validatorMinYearAgo(120),
                  isFuture: validatorFutureDate(),
                },
              }}
            />
          </>
        )}
        <FormInputRadio
          control={control}
          name="documentType"
          label={<Typography variant="headerS">{t('modal.idType')}</Typography>}
          options={getOptionListFromCatalog(Dictionaries.DocumentTypes)}
        />
        <FormInputText
          control={control}
          name="documentNumber"
          required
          label={t(getIdTypePlaceholder())}
          sx={(theme) => ({ maxWidth: { xs: '100%', sm: theme.spacing(42.5) } })}
          rules={{
            required: { value: true, message: tCommon('validation.required') },
            minLength: { value: 5, message: tCommon('validation.length', { min: 5, max: 20 }) },
            maxLength: { value: 20, message: tCommon('validation.length', { min: 5, max: 20 }) },
            pattern: { value: latinLettersNumeralsReg, message: tCommon('validation.password') },
          }}
        />
        {isFullForm && (
          <>
            <Stack
              spacing={2}
              direction="row"
              flexWrap={isXs ? 'wrap' : 'nowrap'}
              sx={[
                isXs && {
                  '& .MuiBox-root': {
                    flexBasis: '100%',
                    ml: '0 !important',
                  },
                },
              ]}
            >
              <FormInputSelect
                options={getOptionListFromCatalog(Dictionaries.Educations)}
                control={control}
                name="educationLevel"
                label={t('modal.education')}
                sx={[
                  isXs && {
                    mb: 2,
                  },
                ]}
              />
              <FormAutocomplete
                control={control}
                name="occupation"
                label={t('modal.occupation')}
                options={getOptionListFromCatalog(Dictionaries.Occupations)}
                fullWidth
              />
            </Stack>
            <Stack spacing={2} direction="row" flexWrap={isXs ? 'wrap' : 'nowrap'}>
              <FormInputSelect
                options={getOptionListFromCatalog(Dictionaries.Races)}
                control={control}
                name="race"
                label={t('modal.race')}
                sx={[
                  isXs && {
                    mb: 2,
                  },
                ]}
              />
              <FormInputSelect
                options={getOptionListFromCatalog(Dictionaries.Nationalities)}
                control={control}
                name="nationality"
                label={t('modal.nationality')}
                sx={[
                  isXs && {
                    flexBasis: '100%',
                    ml: '0 !important',
                  },
                ]}
              />
            </Stack>
            <Stack spacing={2} direction="row" flexWrap={isXs ? 'wrap' : 'nowrap'}>
              <FormInputSelect
                options={getOptionListFromCatalog(Dictionaries.Languages)}
                control={control}
                name="languageCode"
                label={t('modal.languageSpoken')}
                sx={(theme) => ({ maxWidth: { xs: '100%', sm: theme.spacing(42.5) } })}
              />
              {languageCode === OTHERS && (
                <FormInputText
                  control={control}
                  name="languageExtValue"
                  label={t('modal.languageSpoken')}
                  required
                  rules={{
                    required: { value: true, message: tCommon('validation.required') },
                    minLength: { value: 4, message: tCommon('validation.length', { min: 4, max: 30 }) },
                    maxLength: { value: 30, message: tCommon('validation.length', { min: 4, max: 30 }) },
                    pattern: { value: latinLettersSpecialCharactersReg, message: tCommon('validation.name') },
                  }}
                  sx={[
                    isXs && {
                      flexBasis: '100%',
                      ml: '0 !important',
                    },
                  ]}
                />
              )}
            </Stack>
            <FormInputSelect
              options={getOptionListFromCatalog(Dictionaries.Religions)}
              control={control}
              name="religion"
              label={t('modal.religion')}
              sx={(theme) => ({ maxWidth: { xs: '100%', sm: theme.spacing(42.5) } })}
            />
            <FormPhoneInput
              name="phoneNumber"
              codeName="phoneCountryCode"
              phoneCode={phoneCountryCode}
              control={control}
              register={register}
              sx={(theme) => ({
                width: 1,
                maxWidth: { xs: '100%', sm: `${theme.spacing(42.5)} !important` },
              })}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                minLength: { value: 6, message: tCommon('validation.length', { min: 6, max: 14 }) },
                maxLength: { value: 14, message: tCommon('validation.length', { min: 6, max: 14 }) },
              }}
            />
          </>
        )}
      </Stack>
    </>
  );
};
