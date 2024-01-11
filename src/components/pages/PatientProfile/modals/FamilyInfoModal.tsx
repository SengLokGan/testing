import Stack from '@mui/material/Stack';
import { FullScreenModal, FullScreenModalProps } from '@components';
import { FamilyForm, WithSx } from '@types';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { FamilyInformation } from '@components/pages/TodayPatients';
import {
  changeFamilyInfo,
  clearPatientSaveSuccessState,
  selectFamilyInformation,
  selectPatientLoading,
  selectPatientSaveDataSuccess,
  addServiceModal,
} from '@store';
import { phoneInputCodeOptions } from '@constants';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { capitalize } from '@utils';
import { useAppDispatch, usePageUnload, useConfirmNavigation } from '@hooks';
import { ServiceModalName } from '@enums';

type FamilyInfoModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;

export const FamilyInfoModal = ({ onClose, ...props }: FamilyInfoModalProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const familyInfo = selectFamilyInformation();
  const saveSuccess = selectPatientSaveDataSuccess();
  const isSubmitting = selectPatientLoading();

  useEffect(() => {
    if (saveSuccess) {
      dispatch(clearPatientSaveSuccessState());
      onClose();
    }
  }, [saveSuccess]);

  const defaultValues: FamilyForm = {
    maritalStatus: familyInfo?.maritalStatus ?? '',
    childCount: familyInfo?.childCount ?? 0,
    kins: familyInfo?.kins ?? [
      {
        name: '',
        relationship: '',
        phone: {
          number: '',
          countryCode: phoneInputCodeOptions[0].value,
        },
      },
    ],
  };

  const { handleSubmit, control, watch, register } = useForm<FamilyForm>({
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

  const onSubmit = (data: FamilyForm) => {
    const familyInfo = {
      maritalStatus: data?.maritalStatus ?? '',
      childCount: Number(data.childCount),
      kins:
        data?.kins?.map(({ name, phone, relationship }) => ({
          name: capitalize(name),
          phone,
          relationship: relationship,
        })) ?? [],
    };

    if (id) {
      dispatch(changeFamilyInfo({ familyInfo, id, method: familyInfo ? 'put' : 'post' }));
    }
  };

  return (
    <>
      <FullScreenModal title={t('profile.familyInfo')} onClose={handleClose} {...props}>
        <Stack spacing={3} direction="column">
          <Typography variant="headerL">{t('profile.familyInfo')}</Typography>
          <FamilyInformation control={control} watch={watch} register={register} />
        </Stack>
        <Stack direction="column" spacing={2}>
          <Divider />
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant={'outlined'} data-testid="cancelFamilyInfoModalButton">
              {tCommon('button.cancel')}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isSubmitting}
              data-testid="saveFamilyInfoModalButton"
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
