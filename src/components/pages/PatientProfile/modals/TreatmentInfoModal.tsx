import Stack from '@mui/material/Stack';
import type { TreatmentInfoForm, Practitioner, TreatmentInfoRequest } from '@types';
import {
  FormAutocomplete,
  FormAutocompleteFreeSoloAsync,
  FormDatePicker,
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
import { useAppDispatch, usePageUnload, useConfirmNavigation, useGetNursesOptions } from '@hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import {
  changeTreatmentInfo,
  clearPatientSaveSuccessState,
  selectPatientLoading,
  selectPatientSaveDataSuccess,
  selectTreatmentInfo,
  addServiceModal,
} from '@store';
import { booleanOptions } from '@constants';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  validatorIsValidDate,
  validatorLatinLettersNumbersSpecialSymbols,
  validatorFutureDate,
  validatorMaxLength,
  validatorMinLength,
  validatorRequired,
  validatorAutocompleteRequired,
  validatorAutocompletePattern,
  validatorAutocompleteMinLength,
  validatorAutocompleteMaxLength,
  validatorLatinLettersSpecialCharacters,
} from '@validators';
import { API, capitalizeFirstLetter, dateToServerFormat, getTenantEndCurrentDay } from '@utils';
import { AxiosResponse } from 'axios';
import { ServiceModalName, Answer, DoctorTypes, InputTextType } from '@enums';

type TreatmentInfoModalProps = Omit<FullScreenModalProps, 'title'>;

export const TreatmentInfoModal = ({ onClose, ...props }: TreatmentInfoModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const treatmentInfo = selectTreatmentInfo();
  const [personInCharge, setPersonInCharge] = useState<{ label: string; value: number }[]>([]);
  const [nephrologist, setNephrologist] = useState<{ label: string; value: number }[]>([]);
  const { nursesOptions } = useGetNursesOptions();

  const defaultValues: TreatmentInfoForm = {
    isAmbulant: treatmentInfo?.isAmbulant === false ? Answer.No : Answer.Yes,
    personInCharge: treatmentInfo?.personInCharge?.specialities[0]?.id || '',
    nephrologist: treatmentInfo?.nephrologist?.specialities[0]?.id || '',
    referralInfo: treatmentInfo?.referralInfo?.status === false ? Answer.No : Answer.Yes,
    firstDialysis: treatmentInfo?.firstDialysis ? new Date(treatmentInfo.firstDialysis) : null,
    firstCenterDialysis: treatmentInfo?.firstCenterDialysis ? new Date(treatmentInfo.firstCenterDialysis) : null,
    comments: treatmentInfo?.comments?.replace(/\\n/g, '\n') || '',
    referralClinic: treatmentInfo?.referralInfo?.clinic || '',
    referralDoctor: {
      label: treatmentInfo?.referralInfo?.doctor?.name || '',
      value:
        treatmentInfo?.referralInfo?.doctor?.source === DoctorTypes.External
          ? treatmentInfo?.referralInfo?.doctor?.name || ''
          : treatmentInfo?.referralInfo?.doctor?.internalDoctorId || '',
    },
    primaryNurse:
      treatmentInfo?.primaryNurse?.name && treatmentInfo?.primaryNurse?.id
        ? {
            label: treatmentInfo.primaryNurse.name,
            value: treatmentInfo.primaryNurse.id,
          }
        : null,
  };

  const { handleSubmit, control, watch, trigger, setValue } = useForm<TreatmentInfoForm>({
    mode: 'onBlur',
    defaultValues,
    shouldFocusError: true,
  });

  const { isDirty } = useFormState({ control });
  const saveSuccess = selectPatientSaveDataSuccess();
  const isSubmitting = selectPatientLoading();
  const referralInfo = watch('referralInfo');

  useEffect(() => {
    if (saveSuccess) {
      dispatch(clearPatientSaveSuccessState());
      onClose();
    }
  }, [saveSuccess]);

  const fetchOptionsForSelect = () => {
    Promise.all([
      API.get('/pm/doctors?speciality=DOCTOR_IN_CHARGE'),
      API.get('/pm/doctors?speciality=DOCTOR_NEPHROLOGIST'),
    ])
      .then((values: AxiosResponse<Practitioner[]>[]) => {
        setPersonInCharge(
          values[0].data.map((practitioner) => {
            return { label: practitioner.name, value: practitioner.specialities[0]?.id };
          }),
        );
        setNephrologist(
          values[1].data.map((practitioner) => {
            return { label: practitioner.name, value: practitioner.specialities[0]?.id };
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useLayoutEffect(() => {
    fetchOptionsForSelect();
  }, []);

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

  const onSubmit = ({ referralDoctor, ...data }) => {
    const isExternalDoctor = !referralDoctor.value;
    const treatmentInfoData: TreatmentInfoRequest = {
      isAmbulant: data.isAmbulant === Answer.Yes,
      referralInfo: {
        status: data.referralInfo === Answer.Yes,
        clinic: data?.referralClinic,
        doctor: {
          source: isExternalDoctor ? DoctorTypes.External : DoctorTypes.Internal,
          internalDoctorId: !isExternalDoctor ? referralDoctor.value : undefined,
          name: isExternalDoctor ? capitalizeFirstLetter(referralDoctor.label) : undefined,
        },
      },
      firstCenterDialysis: dateToServerFormat(data.firstCenterDialysis as Date),
      firstDialysis: data?.firstDialysis ? dateToServerFormat(data?.firstDialysis as Date) : '',
      comments: data?.comments?.replace(/\n/g, '\\n'),
      nephrologistId: +data.nephrologist,
      personInChargeId: +data.personInCharge,
      primaryNurseId: data?.primaryNurse?.value,
    };
    if (id) {
      dispatch(changeTreatmentInfo({ treatmentInfo: treatmentInfoData, id }));
    }
  };

  useEffect(() => {
    if (referralInfo === Answer.No) {
      setValue('referralDoctor', { label: '', value: '' });
    }
  }, [referralInfo]);

  return (
    <>
      <FullScreenModal title={t('profile.treatmentInfo')} onClose={handleClose} {...props}>
        <Stack spacing={3} direction="column">
          <Typography variant="headerL">{t('profile.treatmentInfo')}</Typography>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormInputRadio
                control={control}
                name="isAmbulant"
                label={t('modal.isPatientAmbulant')}
                options={booleanOptions()}
              />
            </Grid>
            <Grid item container xs={12} columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="headerM">{t('modal.doctors')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputSelect
                  options={personInCharge}
                  control={control}
                  name="personInCharge"
                  label={t('modal.personInCharge')}
                  required
                  fullWidth
                  rules={{ required: validatorRequired() }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputSelect
                  options={nephrologist}
                  control={control}
                  name="nephrologist"
                  label={t('modal.nephrologist')}
                  required
                  fullWidth
                  rules={{ required: validatorRequired() }}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} rowSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="headerM">{t('modal.primaryNurse')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={2}>
                  <FormAutocomplete
                    control={control}
                    name="primaryNurse"
                    options={nursesOptions}
                    label={t('modal.primaryNurse')}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid item container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12}>
                <FormInputRadio
                  control={control}
                  name="referralInfo"
                  label={t('modal.referralInfo')}
                  options={booleanOptions()}
                />
              </Grid>
              {referralInfo === Answer.Yes && (
                <Grid item container xs={12} rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormInputText
                      control={control}
                      name="referralClinic"
                      label={t('modal.clinic')}
                      required
                      fullWidth
                      rules={{
                        required: validatorRequired(),
                        pattern: validatorLatinLettersNumbersSpecialSymbols(),
                        minLength: validatorMinLength(2, 100),
                        maxLength: validatorMaxLength(2, 100),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormAutocompleteFreeSoloAsync
                      required
                      capitalizedLabel
                      name="referralDoctor"
                      trigger={trigger}
                      control={control}
                      label={t('modal.doctorsName')}
                      textType={InputTextType.Capitalize}
                      getOptionsUrl="/pm/doctors?name="
                      optionsTransform={(doctors) =>
                        doctors
                          .map((doctor) => {
                            if (doctor.deleted) return null;
                            return { label: doctor.name, value: doctor?.specialities[0]?.id };
                          })
                          .filter((item) => !!item)
                      }
                      rules={{
                        required: validatorAutocompleteRequired(),
                        pattern: validatorAutocompletePattern(validatorLatinLettersSpecialCharacters()),
                        minLength: validatorAutocompleteMinLength(1, 100, 'label'),
                        maxLength: validatorAutocompleteMaxLength(1, 100, 'label'),
                      }}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="headerM">{t('modal.startDialysis')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDatePicker
                  control={control}
                  name="firstDialysis"
                  label={t('modal.firstDialysisDate')}
                  maxDate={getTenantEndCurrentDay()}
                  fullWidth
                  rules={{
                    validate: {
                      isValid: validatorIsValidDate,
                      isFuture: validatorFutureDate(),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDatePicker
                  control={control}
                  name="firstCenterDialysis"
                  label={t('modal.firstDialysisDateInCenter')}
                  maxDate={getTenantEndCurrentDay()}
                  fullWidth
                  required
                  rules={{
                    required: validatorRequired(),
                    validate: {
                      isValid: validatorIsValidDate,
                      isFuture: validatorFutureDate(),
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container rowSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="headerM">{t('modal.additionalComments')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInputText
                  control={control}
                  name="comments"
                  label={t('modal.comments')}
                  multiline
                  rules={{
                    minLength: validatorMinLength(2, 500),
                    maxLength: validatorMaxLength(2, 500),
                    pattern: validatorLatinLettersNumbersSpecialSymbols(),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Stack direction="column" spacing={2}>
            <Divider />
            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant={'outlined'} data-testid="treatmentInfoModalCancelButton">
                {tCommon('button.cancel')}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant={'contained'}
                disabled={isSubmitting}
                data-testid="treatmentInfoModalSaveButton"
              >
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
