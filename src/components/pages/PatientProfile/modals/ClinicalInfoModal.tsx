import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import type { ClinicalInfoForm, ClinicalInfoRequest, WithSx } from '@types';
import {
  FormAutocompleteFreeSoloAsyncMultiple,
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FullScreenModal,
  FullScreenModalProps,
} from '@components';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, usePageUnload, useConfirmNavigation } from '@hooks';
import { useForm, useFormState } from 'react-hook-form';
import {
  changeClinicalInfo,
  clearPatientSaveSuccessState,
  selectClinicalInfo,
  selectPatientLoading,
  selectPatientSaveDataSuccess,
} from '@store';
import Box from '@mui/material/Box';
import { capitalizeFirstLetter, Dictionaries, getOptionListFromCatalog } from '@utils';
import { allergiesOptions, treatmentOptions } from '@constants';
import InputAdornment from '@mui/material/InputAdornment';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { ServiceModalName, AllergiesInfo, Treatment } from '@enums';
import {
  validatorLatinLettersNumberCharacters,
  validatorLatinLettersNumbersSpecialSymbols,
  validatorMoreLessNumber,
  validatorRequired,
  validatorAutocompleteMultipleMaxItemLength,
  validatorAutocompleteMultiplePattern,
  validatorAutocompleteMultipleRequired,
} from '@validators';

type ClinicalInfoModalProps = WithSx<Omit<FullScreenModalProps, 'title'>>;

export const ClinicalInfoModal = ({ onClose, ...props }: ClinicalInfoModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const patientClinicalInfo = selectClinicalInfo();

  const defaultValues: ClinicalInfoForm = {
    diagnosis: patientClinicalInfo?.diagnosis || '',
    medicalHistory: patientClinicalInfo?.medicalHistory || '',
    treatment: patientClinicalInfo?.treatment || Treatment.Hemodialysis,
    bloodType: patientClinicalInfo?.bloodType || '',
    allergies: patientClinicalInfo?.allergy?.type || AllergiesInfo.NoInfo,
    allergiesValue: patientClinicalInfo?.allergy?.values.map((allergy) => allergy.name) || [],
    hbsag: patientClinicalInfo?.virology?.hbsag || '',
    hbsab: patientClinicalInfo?.virology?.hbsab ?? '',
    antiHcv: patientClinicalInfo?.virology?.antiHcv || '',
    antiHiv: patientClinicalInfo?.virology?.antiHiv || '',
  };

  const { handleSubmit, control, watch, trigger } = useForm<ClinicalInfoForm>({
    mode: 'onBlur',
    defaultValues,
    shouldFocusError: true,
  });

  const allergies = watch('allergies');

  const { isDirty } = useFormState({ control });
  const saveSuccess = selectPatientSaveDataSuccess();
  const isSubmitting = selectPatientLoading();

  useEffect(() => {
    if (saveSuccess) {
      dispatch(clearPatientSaveSuccessState());
      onClose();
    }
  }, [saveSuccess]);

  useConfirmNavigation(isDirty, []);
  usePageUnload(isDirty, tCommon('dataLost'));

  const handleClose = () => {
    isDirty
      ? dispatch(
          addServiceModal({
            name: ServiceModalName.ConfirmModal,
            payload: {
              closeCallback: onClose,
              title: tCommon('wantToQuit'),
              text: tCommon('dataLost'),
              confirmButton: tCommon('button.quit'),
              cancelButton: tCommon('button.cancel'),
            },
          }),
        )
      : onClose();
  };

  const onSubmit = (data: ClinicalInfoForm) => {
    const clinicalInfo: ClinicalInfoRequest = {
      diagnosis: data.diagnosis,
      bloodType: data.bloodType,
      allergy: {
        type: data.allergies,
        values:
          data.allergies === AllergiesInfo.Allergy
            ? data?.allergiesValue.map((name) => ({ name: capitalizeFirstLetter(name) }))
            : [],
      },
      medicalHistory: data.medicalHistory,
      treatment: data.treatment,
      virology: {
        antiHcv: data.antiHcv,
        antiHiv: data.antiHiv,
        hbsag: data.hbsag,
        hbsab: data.hbsab ? data.hbsab.replace(',', '.') : '',
      },
    };
    if (id) {
      dispatch(changeClinicalInfo({ clinicalInfo, id, method: patientClinicalInfo ? 'put' : 'post' }));
    }
  };

  return (
    <>
      <FullScreenModal title={t('profile.clinicalInfo')} onClose={handleClose} {...props}>
        <Stack spacing={3} direction="column">
          <Typography variant="headerL">{t('profile.clinicalInfo')}</Typography>
          <Stack direction="column" spacing={2}>
            <Typography variant="headerM">{t('modal.mainInfo')}</Typography>
            <FormInputText
              control={control}
              name="diagnosis"
              label={t('modal.diagnosis')}
              required
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                minLength: { value: 2, message: tCommon('validation.length', { min: 2, max: 500 }) },
                maxLength: { value: 500, message: tCommon('validation.length', { min: 2, max: 500 }) },
                pattern: validatorLatinLettersNumberCharacters(),
              }}
            />
            <FormInputText
              control={control}
              name="medicalHistory"
              label={t('modal.medicalHistory')}
              multiline
              rules={{
                minLength: { value: 2, message: tCommon('validation.length', { min: 2, max: 1000 }) },
                maxLength: { value: 1000, message: tCommon('validation.length', { min: 2, max: 1000 }) },
                pattern: validatorLatinLettersNumberCharacters(),
              }}
            />
            <FormInputRadio
              control={control}
              name="treatment"
              label={<Typography variant="headerS">{t('modal.currentTreatment')}</Typography>}
              options={treatmentOptions().map((option) => ({ ...option, label: t(`profile.${option.label}`) }))}
            />
          </Stack>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="headerM">{t('modal.bloodType')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputSelect
                options={getOptionListFromCatalog(Dictionaries.BloodTypes)}
                control={control}
                name="bloodType"
                label={t('modal.bloodType')}
                required
                rules={{
                  required: validatorRequired(),
                }}
              />
            </Grid>
          </Grid>
          <Stack direction="column" spacing={2}>
            <Typography variant="headerM">{t('modal.drugAllergy')}</Typography>
            <FormInputRadio
              control={control}
              name="allergies"
              options={allergiesOptions().map((option) => ({ ...option, label: t(option.label) }))}
            />
            {allergies === AllergiesInfo.Allergy && (
              <FormAutocompleteFreeSoloAsyncMultiple
                required
                placeholderRequired
                capitalizedLabel
                name="allergiesValue"
                trigger={trigger}
                control={control}
                placeholder={t('modal.enterDrug')}
                getOptionsUrl="/pm/allergies?name="
                optionsTransform={(allergies) => [
                  ...allergies
                    .reduce((map, allergy) => {
                      map.set(allergy.id, {
                        label: allergy.name,
                        value: allergy.id,
                      });
                      return map;
                    }, new Map())
                    .values(),
                ]}
                rules={{
                  required: validatorAutocompleteMultipleRequired(),
                  maxLength: validatorAutocompleteMultipleMaxItemLength(1, 100),
                  pattern: validatorAutocompleteMultiplePattern(validatorLatinLettersNumbersSpecialSymbols()),
                }}
              />
            )}
          </Stack>
          <Grid container rowSpacing={2}>
            <Grid xs={12}>
              <Typography variant="headerM" sx={{ mb: 1 }}>
                {t('modal.virologyStatus')}
              </Typography>
              <Typography variant="paragraphM">{t('modal.testResultRefer')}</Typography>
            </Grid>
            <Grid item container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormInputSelect
                  options={getOptionListFromCatalog(Dictionaries.VirologyStatuses)}
                  control={control}
                  name="hbsag"
                  label={t('modal.hbsag')}
                  required
                  rules={{
                    required: { value: true, message: tCommon('validation.required') },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormInputText
                  control={control}
                  name="hbsab"
                  label={t('modal.hbsab')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pointerEvents: 'none', pl: 0.5 }}>
                        {t('modal.IU/L')}
                      </InputAdornment>
                    ),
                  }}
                  rules={{
                    pattern: validatorMoreLessNumber(),
                  }}
                  sx={{
                    '& input': {
                      pl: 0,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormInputSelect
                  options={getOptionListFromCatalog(Dictionaries.VirologyStatuses)}
                  control={control}
                  name="antiHcv"
                  label={t('modal.antiHcv')}
                  required
                  rules={{
                    required: { value: true, message: tCommon('validation.required') },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormInputSelect
                  options={getOptionListFromCatalog(Dictionaries.VirologyStatuses)}
                  control={control}
                  name="antiHiv"
                  label={t('modal.antiHiv')}
                  required
                  rules={{
                    required: { value: true, message: tCommon('validation.required') },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Stack direction="column" spacing={2}>
            <Divider />
            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant={'outlined'}>
                {tCommon('button.cancel')}
              </Button>
              <Button onClick={handleSubmit(onSubmit)} variant={'contained'} disabled={isSubmitting}>
                {tCommon('button.save')}
                {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </FullScreenModal>
    </>
  );
};
