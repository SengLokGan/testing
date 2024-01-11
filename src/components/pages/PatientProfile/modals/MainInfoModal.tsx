import Stack from '@mui/material/Stack';
import type { MainInfoForm, WithSx } from '@types';
import { FullScreenModal, FullScreenModalProps } from '@components';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useConfirmNavigation, usePageUnload, usePhotoManagement } from '@hooks';
import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import {
  addServiceModal,
  changeMainInfo,
  clearPatientSaveSuccessState,
  selectIsPatientNotUniqueError,
  selectPatient,
  selectPatientLoading,
  selectPatientPhoto,
  selectPatientSaveDataSuccess,
} from '@store';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { AdditionalComments, Address, MainInformation } from '@components/pages/TodayPatients';
import { patientStatusesList, phoneInputCodeOptions } from '@constants';
import { capitalize, dateToServerFormat, Dictionaries, getCodeValueFromCatalog } from '@utils';
import { PatientStatuses, ServiceModalName } from '@enums';

type MainInfoModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;

export const MainInfoModal = ({ onClose, ...props }: MainInfoModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const { t: tErrors } = useTranslation('errors');
  const { t: tStatuses } = useTranslation(Dictionaries.PatientStatuses);
  const dispatch = useAppDispatch();
  const isNotUniquePatient = selectIsPatientNotUniqueError();
  const { id } = useParams();
  const patientInfo = selectPatient();
  const patientPhoto = selectPatientPhoto();
  const patientStatus = patientInfo?.status ?? patientStatusesList[0].value;
  const { currentPhoto, setCurrentPhoto } = usePhotoManagement(patientPhoto);

  const defaultValues: MainInfoForm = {
    name: patientInfo?.name ?? '',
    documentType: patientInfo?.document?.type ?? 'NRIC',
    documentNumber: patientInfo?.document?.number ?? '',
    houseFlat: patientInfo?.address?.houseFlat ?? '',
    street: patientInfo?.address?.street ?? '',
    city: patientInfo?.address?.city ?? '',
    district: patientInfo?.address?.district ?? '',
    state: patientInfo?.address?.state ?? '',
    countryIso: patientInfo?.address?.countryIso ?? '',
    postalCode: patientInfo?.address?.postalCode ?? '',
    comment: patientInfo?.comment ?? '',
    dateBirth: (patientInfo?.dateBirth && new Date(patientInfo.dateBirth)) ?? '',
    genderCode: patientInfo?.gender?.code ?? '',
    genderExtValue: patientInfo?.gender?.extValue ?? '',
    educationLevel: patientInfo?.educationLevel ?? '',
    occupation: patientInfo?.occupation
      ? { label: getCodeValueFromCatalog('occupation', patientInfo.occupation), value: patientInfo.occupation }
      : null,
    race: patientInfo?.race ?? '',
    nationality: patientInfo?.nationality ?? '',
    languageCode: patientInfo?.language?.code ?? '',
    languageExtValue: patientInfo?.language?.extValue ?? '',
    religion: patientInfo?.religion ?? '',
    phoneNumber: patientInfo?.phone?.number ?? '',
    phoneCountryCode: patientInfo?.phone?.countryCode ?? phoneInputCodeOptions[0].value,
  };

  const { handleSubmit, control, watch, register, setError } = useForm<MainInfoForm>({
    mode: 'onBlur',
    defaultValues,
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const { isDirty } = useFormState({ control });
  const saveSuccess = selectPatientSaveDataSuccess();
  const isSubmitting = selectPatientLoading();

  useEffect(() => {
    if (saveSuccess) {
      dispatch(clearPatientSaveSuccessState());
      onClose();
    }
  }, [saveSuccess]);

  useEffect(() => {
    isNotUniquePatient &&
      setError('documentNumber', { message: tErrors('PATIENT_IS_NOT_UNIQUE') }, { shouldFocus: true });
  }, [isNotUniquePatient]);

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

  const onSubmit = (data: MainInfoForm) => {
    const walkInPatient = {
      name: capitalize(data.name),
      document: {
        type: data.documentType,
        number: data.documentNumber,
      },
      address: {
        postalCode: data.postalCode,
        countryIso: data.countryIso,
        state: capitalize(data.state),
        city: capitalize(data.city),
        district: capitalize(data.district),
        street: capitalize(data.street),
        houseFlat: data.houseFlat,
      },
      comment: data.comment,
    };

    if (
      patientStatus === PatientStatuses.Walk_In ||
      patientStatus === PatientStatuses.Discharged ||
      patientStatus === PatientStatuses.Dead
    ) {
      if (id) {
        dispatch(changeMainInfo({ patient: walkInPatient, id, status: patientStatus }));
      }
      return;
    }

    const fullPatient = {
      ...walkInPatient,
      dateBirth: dateToServerFormat(data.dateBirth as Date),
      gender: {
        code: data.genderCode,
        extValue: data.genderExtValue || '',
      },
      phone: {
        countryCode: data.phoneCountryCode,
        number: data.phoneNumber,
      },
      educationLevel: data.educationLevel,
      occupation: data.occupation?.value,
      race: data.race,
      nationality: data.nationality,
      language: {
        code: data.languageCode,
        extValue: data.languageExtValue || '',
      },
      religion: data.religion,
      photoPath: currentPhoto.photoPath || currentPhoto.localPhotoPath,
    };
    if (id) {
      dispatch(changeMainInfo({ patient: fullPatient, id, status: patientStatus }));
    }
  };

  return (
    <>
      <FullScreenModal title={t('profile.mainInfo')} onClose={handleClose} {...props}>
        <Stack spacing={2} direction="column">
          <Typography variant="headerL" sx={{ mb: 1 }}>
            {t('profile.mainInfo')}
          </Typography>
          <Typography variant="paragraphM" sx={{ mb: 3, mt: `0 !important` }}>
            {tStatuses(patientStatus)} {t('patient')}
          </Typography>
          <Stack spacing={3} direction="column">
            <MainInformation
              control={control}
              watch={watch}
              patientStatus={patientStatus}
              register={register}
              setCurrentPhoto={setCurrentPhoto}
              currentPhoto={currentPhoto.localPhotoPath}
              defaultValues={defaultValues}
            />
            <Address control={control} />
            <AdditionalComments control={control} />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Divider />
            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant={'outlined'} data-testid="cancelMainInfoModalButton">
                {tCommon('button.cancel')}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant={'contained'}
                disabled={isSubmitting}
                data-testid="saveMainInfoModalButton"
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
