import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  addServiceModal,
  removeServiceModal,
  submitEventForm,
  selectLoadingClinicalSchedule,
  selectServiceModal,
} from '@store/slices';
import { ServiceModalName } from '@enums/components';
import { useAppDispatch } from '@hooks/storeHooks';
import { ServiceModalProps, ClinicalEventFormType } from '@types';
import { useForm, useFormState } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { AddClinicalEventForm } from './AddClinicalEventForm';
import { DraggableComponent } from '@components';

const AddClinicalEventModal = ({ index }: ServiceModalProps) => {
  const dispatch = useAppDispatch();
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('schedule');
  const isLoading = selectLoadingClinicalSchedule();
  const { id: editedEventId, ...defaultValues }: ClinicalEventFormType & { id?: string } = selectServiceModal(
    ServiceModalName.AddClinicalEventModal,
  );

  const { handleSubmit, control, watch, trigger, setValue } = useForm<ClinicalEventFormType>({
    mode: 'onBlur',
    defaultValues,
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const { isDirty, touchedFields } = useFormState({ control });
  const eventType = watch('type');
  const isAllDay = watch('isAllDay');
  const date = watch('date');
  const startTime = watch('startTime');
  const endTime = watch('endTime');

  useEffect(() => {
    !!eventType && !!date && trigger('date');
    !editedEventId && setValue('doctor', null);
  }, [eventType]);

  useEffect(() => {
    if (isAllDay) {
      startTime && setValue('startTime', null);
      endTime && setValue('endTime', null);
    }
    touchedFields.startTime && trigger('startTime');
    touchedFields.endTime && trigger('endTime');
  }, [isAllDay]);

  useEffect(() => {
    startTime && trigger('endTime');
  }, [startTime]);

  const onCloseHandler = () => {
    isDirty
      ? dispatch(
          addServiceModal({
            name: ServiceModalName.ConfirmModal,
            payload: {
              closeCallback: () => dispatch(removeServiceModal(ServiceModalName.AddClinicalEventModal)),
              title: tCommon('closeWithoutSaving'),
              text: tCommon('dataLost'),
              confirmButton: tCommon('button.continue'),
              cancelButton: tCommon('button.cancel'),
            },
          }),
        )
      : dispatch(removeServiceModal(ServiceModalName.AddClinicalEventModal));
  };

  const onSubmit = (data) => {
    dispatch(submitEventForm({ ...data, id: editedEventId }));
  };

  return (
    <Dialog
      PaperComponent={DraggableComponent}
      open
      disableEnforceFocus
      onClose={onCloseHandler}
      data-testid="addClinicalEventModal"
      sx={{ zIndex: index, width: 1 }}
      slots={{ backdrop: () => null }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          m: 0,
          p: 1,
          pl: 2,
          cursor: 'move',
        }}
        id="draggable-dialog-title"
      >
        <DragHandleIcon />
        <Typography variant="labelLSB">{t('addEvent')}</Typography>
        <IconButton
          onClick={onCloseHandler}
          sx={({ palette }) => ({ color: palette.icon.main })}
          data-testid="closeIcon"
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent
        dividers
        sx={({ spacing }) => ({ p: 2, display: 'flex', flexDirection: 'column', width: spacing(43) })}
      >
        <AddClinicalEventForm control={control} watch={watch} editedEventId={editedEventId} />
        <Stack spacing={2} direction="row" sx={{ flexWrap: 'no-wrap', paddingTop: 2 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={onCloseHandler}
            fullWidth
            data-testid="addClinicalEventModalCancelButton"
          >
            {tCommon('button.cancel')}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            disabled={isLoading || !eventType}
            data-testid="addClinicalEventModalSaveButton"
          >
            {tCommon('button.save')}
            {isLoading && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddClinicalEventModal;
