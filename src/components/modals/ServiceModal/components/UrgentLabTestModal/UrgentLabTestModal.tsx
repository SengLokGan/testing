import { LabCreationForm, ServiceModalProps, UrgentLabTestForm } from '@types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  addServiceModal,
  submitLabOrderForm,
  removeServiceModal,
  selectLabOrdersIsSubmitting,
  selectServiceModal,
} from '@store';

import CloseIcon from '@mui/icons-material/Close';
import { LabSpecimenType, LabTestTypes, ServiceModalName } from '@enums';
import { useForm, useFormState } from 'react-hook-form';
import { useConfirmNavigation } from '@hooks/useConfirmNavigation';
import { usePageUnload } from '@hooks/usePageUnload';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { UrgentLabTestFormView } from '@components/modals/ServiceModal/components/UrgentLabTestModal/components/UrgentLabTestFormView';
import { DialogActions } from '@mui/material';

const UrgentLabTestModal = ({ index }: ServiceModalProps) => {
  const dispatch = useAppDispatch();
  const { t: tLabs } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const isSubmitting = selectLabOrdersIsSubmitting();
  const { disabledPatient, place, formInitialValues, mode, planId } = selectServiceModal(
    ServiceModalName.UrgentLabTest,
  );

  const { handleSubmit, control, watch, setValue } = useForm<UrgentLabTestForm>({
    mode: 'onBlur',
    defaultValues: formInitialValues,
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const { isDirty } = useFormState({ control });
  useConfirmNavigation(isDirty, []);
  usePageUnload(isDirty, tCommon('dataLost'));

  const onSubmitHandler = (data: UrgentLabTestForm) => {
    const preparedData: LabCreationForm = {
      labId: data.laboratory?.value!,
      patientId: data.patient.value,
      procedureId: data.procedure?.value!,
      specimenType: data.specimenType! as LabSpecimenType,
    };

    dispatch(
      submitLabOrderForm({
        formData: preparedData,
        place,
        type: LabTestTypes.UrgentLabTest,
        mode,
        id: planId,
      }),
    );
  };

  const onCloseHandler = () => {
    dispatch(removeServiceModal(ServiceModalName.UrgentLabTest));
  };

  const openConfirmModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: onCloseHandler,
          title: tCommon('continueWithoutSaving'),
          text: tCommon('allUnsavedDataWillBeLost'),
          confirmButton: tCommon('button.continue'),
        },
      }),
    );
  };

  return (
    <Dialog
      open={true}
      disableEnforceFocus
      onClose={openConfirmModal}
      data-testid="urgentLabTestModal"
      sx={{ zIndex: index }}
    >
      <Box sx={{ m: 0, p: 2, minWidth: (theme) => theme.spacing(83.5) }}>
        <Typography variant="headerS">{tLabs('modal.urgentLabTest')}</Typography>
        <IconButton
          onClick={openConfirmModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.icon.main,
          }}
          data-testid="closeIcon"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers sx={{ p: 2 }}>
        <Stack direction="column">
          <UrgentLabTestFormView
            control={control}
            setValue={setValue}
            watch={watch}
            patientDisabled={disabledPatient}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            disabled={isSubmitting}
            onClick={openConfirmModal}
            variant="outlined"
            data-testid="cancelUrgentLabTestFormButton"
          >
            {tCommon('button.cancel')}
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            variant={'contained'}
            disabled={isSubmitting}
            data-testid="saveUrgentLabTestFormButton"
          >
            {tCommon('button.save')}
            {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UrgentLabTestModal;
