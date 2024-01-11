import { Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FullScreenModal, FullScreenModalProps, TextToggleButton } from '@components';
import type { FormPatient, RegisterPatientForm, WalkInPatient, WithSx } from '@types';
import Stack from '@mui/material/Stack';
import { FileTypes, PatientDocumentType, PatientStatuses, ServiceModalName } from '@enums';
import { patientStatusesList } from '@constants';
import { MALAYSIA_PHONE_CODE } from '@constants/components/PhoneInput';
import { useTranslation } from 'react-i18next';
import { useForm, useFormState } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Divider, useMediaQuery } from '@mui/material';
import { useAppDispatch, useConfirmNavigation, usePageUnload, usePhotoManagement } from '@hooks';
import {
  addServiceModal,
  clearPatientData,
  clearPatientSaveSuccessState,
  createNewPatient,
  selectIsPatientNotUniqueError,
  selectPatientLoading,
  selectPatientSaveDataSuccess,
} from '@store';
import { capitalize, dateToServerFormat } from '@utils';
import { FullForm } from './components/FullForm';
import { WalkInForm } from './components/WalkInForm';
import CircularProgress from '@mui/material/CircularProgress';

type RegisterPatientModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;

const defaultValues: RegisterPatientForm = {
  name: '',
  documentType: PatientDocumentType.NRIC,
  documentNumber: '',
  houseFlat: '',
  street: '',
  city: '',
  district: '',
  state: '',
  countryIso: 'MY',
  postalCode: '',
  comment: '',
  dateBirth: null,
  genderCode: '',
  genderExtValue: '',
  educationLevel: '',
  occupation: null,
  race: '',
  nationality: '',
  languageCode: '',
  languageExtValue: '',
  religion: '',
  phoneNumber: '',
  phoneCountryCode: MALAYSIA_PHONE_CODE,
  maritalStatus: '',
  childCount: 0,
  kins: [
    {
      name: '',
      relationship: '',
      phone: {
        countryCode: MALAYSIA_PHONE_CODE,
        number: '',
      },
    },
  ],
  [FileTypes.IdentityDocument]: [],
  [FileTypes.VirologyStatus]: [],
  [FileTypes.MedicalReport]: [],
  [FileTypes.Consultation]: [],
  [FileTypes.BloodTest]: [],
  [FileTypes.HdPrescription]: [],
  [FileTypes.Other]: [],
};

const getPatientProps = (
  status: PatientStatuses,
  data: RegisterPatientForm,
  photo?: string,
): WalkInPatient | FormPatient => {
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

  if (status === PatientStatuses.Walk_In || status === PatientStatuses.Discharged || status === PatientStatuses.Dead) {
    return walkInPatient as WalkInPatient;
  }

  const files = [
    ...data[FileTypes.IdentityDocument],
    ...data[FileTypes.VirologyStatus],
    ...data[FileTypes.MedicalReport],
    ...data[FileTypes.Consultation],
    ...data[FileTypes.BloodTest],
    ...data[FileTypes.HdPrescription],
    ...data[FileTypes.Other],
  ];
  const preparedFiles = files.map(({ name, type, tempKey }) => ({ name, type, tempKey }));

  return {
    ...walkInPatient,
    dateBirth: data.dateBirth && data.dateBirth instanceof Date ? dateToServerFormat(data.dateBirth) : '',
    gender: {
      code: data.genderCode,
      extValue: data.genderExtValue || '',
    },
    phone: {
      countryCode: data.phoneCountryCode,
      number: data.phoneNumber,
    },
    family: {
      maritalStatus: data?.maritalStatus ?? '',
      childCount: Number(data.childCount),
      kins:
        data?.kins?.map(({ name, phone, relationship }) => ({
          name: capitalize(name),
          phone,
          relationship: relationship,
        })) ?? [],
    },
    educationLevel: data.educationLevel,
    occupation: data.occupation?.value || '',
    race: data.race,
    nationality: data.nationality,
    language: {
      code: data.languageCode,
      extValue: data.languageExtValue || '',
    },
    religion: data.religion,
    files: preparedFiles,
    photoPath: photo,
  };
};

export const RegisterPatientModal = ({ onClose, ...props }: RegisterPatientModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const { t: tErrors } = useTranslation('errors');
  const dispatch = useAppDispatch();
  const isNotUniquePatient = selectIsPatientNotUniqueError();
  const [patientStatus, setPatientStatus] = useState(patientStatusesList[0].value);
  const { handleSubmit, control, watch, register, reset, setError } = useForm<RegisterPatientForm>({
    mode: 'onBlur',
    defaultValues,
    shouldFocusError: true,
  });
  const { isDirty } = useFormState({ control });
  const createSuccess = selectPatientSaveDataSuccess();
  const isSubmitting = selectPatientLoading();
  const { currentPhoto, setCurrentPhoto } = usePhotoManagement();
  const [fileLoadingCount, setFileLoadingCount] = useState<number>(0);
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (createSuccess) {
      onClose();
      reset(defaultValues);
      dispatch(clearPatientSaveSuccessState());
    } else {
      dispatch(clearPatientData());
    }
  }, [createSuccess]);

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

  const onSubmit = (data: RegisterPatientForm) => {
    const patientData = getPatientProps(patientStatus, data, currentPhoto.photoPath);
    dispatch(
      createNewPatient({
        patient: patientData,
        status: patientStatus,
        messages: { success: t('modal.patientCreated'), error: tCommon('noConnection') },
      }),
    );
  };

  return (
    <FullScreenModal title={t('modal.newPatient')} onClose={handleClose} {...props}>
      <Stack spacing={6} direction="column">
        <Typography variant="headerL">{t('modal.mainInfo')}</Typography>
        <Box sx={[isXs && { mt: (theme) => `${theme.spacing(2)} !important` }]}>
          <Typography variant="headerM" sx={{ mb: 2 }}>
            {t('modal.status')}
          </Typography>
          <Stack spacing={2} direction="row">
            {patientStatusesList.map(({ value, title, dataTest }) => (
              <TextToggleButton
                key={value}
                value={value}
                title={t(title)}
                isSelected={value === patientStatus}
                onChange={() => setPatientStatus(value)}
                data-testid={dataTest}
              />
            ))}
          </Stack>
        </Box>
        {patientStatus === PatientStatuses.Walk_In ||
        patientStatus === PatientStatuses.Discharged ||
        patientStatus === PatientStatuses.Dead ? (
          <WalkInForm control={control} watch={watch} patientStatus={patientStatus} register={register} />
        ) : (
          <FullForm
            control={control}
            watch={watch}
            patientStatus={patientStatus}
            register={register}
            currentPhoto={currentPhoto.localPhotoPath}
            setCurrentPhoto={setCurrentPhoto}
            setFileLoadingCount={setFileLoadingCount}
          />
        )}
        <Stack direction="column" spacing={2} sx={[isXs && { mt: (theme) => `${theme.spacing(3)} !important` }]}>
          <Divider />
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant={'outlined'} data-testid="formCancelButton">
              {tCommon('button.cancel')}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isSubmitting || fileLoadingCount > 0}
              data-testid="formSaveButton"
            >
              {tCommon('button.save')}
              {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </FullScreenModal>
  );
};
