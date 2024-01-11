import Stack from '@mui/material/Stack';
import type { StaffUserChangeProfileRequest, WithSx } from '@types';
import { FileDocument, StaffProfileForm } from '@types';
import {
  FormAutocompleteMultiple,
  FormDocumentsUpload,
  FormInputText,
  FullScreenModal,
  FullScreenModalProps,
} from '@components';
import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useConfirmNavigation, usePageUnload, usePhotoManagement } from '@hooks';
import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import {
  addServiceModal,
  changeStaffUserInfo,
  clearStaffUserSaveSuccessState,
  selectStaffUser,
  selectStaffUserLoading,
  selectStaffUserPhoto,
  selectStaffUserS3AntivirusErrors,
  selectStaffUserSaveDataSuccess,
} from '@store';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { FileTypes, InputTextType, ServiceModalName } from '@enums';
import { UploadPhotoModal, UploadPhotoModalStep } from '@components/pages/PatientProfile';
import Avatar from '@mui/material/Avatar';
import emptyPatientUploadIcon from '@assets/emptyPatientUpload.svg';
import { MAX_FILE_SIZE, MAX_FILE_SIZE_TEXT } from '@constants/containers';
import {
  validatorMaxLength,
  validatorMinLength,
  validatorMaxFileCount,
  validatorMaxFileSize,
  validatorInfectedFiles,
} from '@validators';
import { validatorLatinLettersNumbersCharactersWithoutSpaces } from '@validators/validatorLatinLettersNumbersCharactersWithoutSpaces';
import { Dictionaries, getOptionListFromCatalog } from '@utils/getOptionsListFormCatalog';

type StaffProfileModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;

export const StaffProfileModal = ({ onClose, ...props }: StaffProfileModalProps) => {
  const { t } = useTranslation('staffManagement');
  const { t: tCommon } = useTranslation('common');
  const { t: tUserResponsibilities } = useTranslation(Dictionaries.UserResponsibilities);
  const { t: tUserRoles } = useTranslation(Dictionaries.UserRoles);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const staffUserInfo = selectStaffUser();
  const staffUserPhoto = selectStaffUserPhoto();
  const saveSuccess = selectStaffUserSaveDataSuccess();
  const isLoading = selectStaffUserLoading();
  const infectedFileKeys = selectStaffUserS3AntivirusErrors();
  const { currentPhoto, setCurrentPhoto } = usePhotoManagement(staffUserPhoto);
  const [isUploadPhotoModalOpen, setIsUploadPhotoModalOpen] = useState(false);
  const [fileLoadingCount, setFileLoadingCount] = useState(0);

  const defaultValues: StaffProfileForm = {
    name: staffUserInfo?.name ?? '',
    login: staffUserInfo?.login ?? '',
    profRegNumber: staffUserInfo?.profRegNumber ?? '',
    specialities: staffUserInfo?.specialities.map((speciality) => tUserResponsibilities(speciality)) || [],
    roles: staffUserInfo?.roles.map((role) => tUserRoles(role)) || [],
    files: staffUserInfo?.files || [],
  };

  const { handleSubmit, control } = useForm<StaffProfileForm>({
    mode: 'onBlur',
    defaultValues,
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const { isDirty } = useFormState({ control });

  useEffect(() => {
    if (saveSuccess) {
      dispatch(clearStaffUserSaveSuccessState());
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

  const onSubmit = (data: StaffProfileForm) => {
    const preparedFiles = data?.files?.map(({ name, tempKey }) => ({
      name,
      type: FileTypes.Staff,
      tempKey,
    })) as FileDocument[];
    const staffUser: StaffUserChangeProfileRequest = {
      files: preparedFiles,
      profRegNumber: data?.profRegNumber,
      specialities: data.specialities.map(
        (speciality) =>
          getOptionListFromCatalog(Dictionaries.UserResponsibilities).find((option) => option.label === speciality)
            ?.value || '',
      ),
      photoPath: currentPhoto.photoPath || currentPhoto.localPhotoPath,
    };
    if (id) {
      dispatch(changeStaffUserInfo({ id, staffUser }));
    }
  };

  return (
    <>
      <FullScreenModal title={t('modal.editUser')} onClose={handleClose} {...props}>
        {isUploadPhotoModalOpen && setCurrentPhoto && (
          <UploadPhotoModal
            setCurrentPhoto={setCurrentPhoto}
            currentPhoto={currentPhoto.localPhotoPath}
            step={currentPhoto.localPhotoPath ? UploadPhotoModalStep.ChangePhoto : UploadPhotoModalStep.AddPhoto}
            isOpen={isUploadPhotoModalOpen}
            onClose={() => setIsUploadPhotoModalOpen(false)}
            changePhotoUrl="/pm/users/photo"
          />
        )}
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Avatar
              sx={(theme) => ({
                width: theme.spacing(12.5),
                height: theme.spacing(12.5),
                bgcolor: theme.palette.primary[90],
                cursor: 'pointer',
              })}
              onClick={() => setIsUploadPhotoModalOpen(true)}
              src={currentPhoto.localPhotoPath ?? emptyPatientUploadIcon}
              alt="avatar"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputText
              control={control}
              name="name"
              textType={InputTextType.Capitalize}
              label={t('modal.name')}
              required
              isDisabled
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputText control={control} name="login" label={t('modal.login')} required isDisabled />
          </Grid>
          <Grid item xs={12}>
            <FormAutocompleteMultiple
              control={control}
              name="roles"
              options={[]}
              popupIcon={false}
              placeholder={t('modal.role')}
              required
              isDisabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormAutocompleteMultiple
              control={control}
              name="specialities"
              options={getOptionListFromCatalog(Dictionaries.UserResponsibilities).map((option) => option.label)}
              popupIcon={false}
              placeholder={t('modal.responsibilities')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              name="profRegNumber"
              label={t('modal.profRegNumber')}
              rules={{
                minLength: validatorMinLength(3, 50),
                maxLength: validatorMaxLength(3, 50),
                pattern: validatorLatinLettersNumbersCharactersWithoutSpaces(),
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <FormDocumentsUpload
              name="files"
              control={control}
              maxFileSize={MAX_FILE_SIZE}
              label={t('modal.uploadFiles')}
              subLabel={tCommon('fileUpload.fileLimits', { maxFileCount: 10, maxFileSize: MAX_FILE_SIZE_TEXT })}
              maxFileCount={10}
              rules={{
                validate: {
                  maxCount: validatorMaxFileCount(10),
                  maxSize: validatorMaxFileSize(MAX_FILE_SIZE),
                  infected: validatorInfectedFiles(infectedFileKeys),
                },
              }}
              uploadFileUrl="/pm/users/files"
              setFileLoadingCount={setFileLoadingCount}
              infectedFileKeys={infectedFileKeys}
            />
          </Grid>
        </Grid>
        <Stack direction="column" spacing={2}>
          <Divider />
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant={'outlined'} data-testid="cancelStaffUserProfileModalButton">
              {tCommon('button.cancel')}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isLoading || fileLoadingCount > 0}
              data-testid="saveStaffUserProfileModalButton"
            >
              {tCommon('button.save')}
              {(isLoading || fileLoadingCount > 0) && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
            </Button>
          </Stack>
        </Stack>
      </FullScreenModal>
    </>
  );
};
