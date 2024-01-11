import { FullScreenModal, FullScreenModalProps } from '@components';
import { DocumentsForm, FormFile, WithSx } from '@types';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, usePageUnload, useConfirmNavigation } from '@hooks';
import { useParams } from 'react-router-dom';
import {
  changeDocuments,
  clearPatientSaveSuccessState,
  selectPatientDocuments,
  selectPatientLoading,
  selectPatientSaveDataSuccess,
  addServiceModal,
} from '@store';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DocumentUpload } from '@components/pages/TodayPatients';
import { ServiceModalName, FileTypes } from '@enums';

type DocumentsModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;

export const DocumentsModal = ({ onClose, ...props }: DocumentsModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const documents = selectPatientDocuments();
  const saveSuccess = selectPatientSaveDataSuccess();
  const isSubmitting = selectPatientLoading();
  const [fileLoadingCount, setFileLoadingCount] = useState<number>(0);

  useEffect(() => {
    if (saveSuccess) {
      dispatch(clearPatientSaveSuccessState());
      onClose();
    }
  }, [saveSuccess]);

  const fieldsData = documents?.reduce((acc, file) => {
    const fileType = file.type;
    if (acc[fileType]) {
      acc[fileType] = [...acc[fileType], file];
    } else {
      acc[fileType] = [file];
    }
    return acc;
  }, {});

  const defaultValues: DocumentsForm = {
    [FileTypes.IdentityDocument]: fieldsData?.[FileTypes.IdentityDocument] || [],
    [FileTypes.VirologyStatus]: fieldsData?.[FileTypes.VirologyStatus] || [],
    [FileTypes.MedicalReport]: fieldsData?.[FileTypes.MedicalReport] || [],
    [FileTypes.Consultation]: fieldsData?.[FileTypes.Consultation] || [],
    [FileTypes.BloodTest]: fieldsData?.[FileTypes.BloodTest] || [],
    [FileTypes.HdPrescription]: fieldsData?.[FileTypes.HdPrescription] || [],
    [FileTypes.Other]: fieldsData?.[FileTypes.Other] || [],
  };

  const { handleSubmit, control } = useForm<DocumentsForm>({
    mode: 'onBlur',
    defaultValues,
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const { isDirty } = useFormState({ control });

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

  const onSubmit = (data: DocumentsForm) => {
    const files = [
      ...data[FileTypes.IdentityDocument],
      ...data[FileTypes.VirologyStatus],
      ...data[FileTypes.MedicalReport],
      ...data[FileTypes.Consultation],
      ...data[FileTypes.BloodTest],
      ...data[FileTypes.HdPrescription],
      ...data[FileTypes.Other],
    ];
    const preparedFiles = files.map((file) => {
      if (file.tempKey) {
        return {
          name: file.name,
          type: file.type,
          tempKey: file.tempKey,
        } as FormFile;
      }
      return file;
    });

    if (id) {
      dispatch(changeDocuments({ id, files: preparedFiles }));
    }
  };

  return (
    <>
      <FullScreenModal title={t('profile.documentsSubmit')} onClose={handleClose} {...props}>
        <Stack spacing={3} direction="column">
          <Typography variant="headerL">{t('profile.documentsSubmit')}</Typography>
          <DocumentUpload control={control} setFileLoadingCount={setFileLoadingCount} />
        </Stack>
        <Stack direction="column" spacing={2}>
          <Divider />
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant={'outlined'} data-testid="cancelDocumentsModalButton">
              {tCommon('button.cancel')}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isSubmitting || fileLoadingCount > 0}
              data-testid="saveDocumentsModalButton"
            >
              {tCommon('button.save')}
              {isSubmitting && (
                <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} data-testid="progressbar" />
              )}
            </Button>
          </Stack>
        </Stack>
      </FullScreenModal>
    </>
  );
};
