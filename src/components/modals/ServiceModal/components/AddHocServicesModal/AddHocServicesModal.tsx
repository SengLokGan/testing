import { useTranslation } from 'react-i18next';
import { useForm, useFormState } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { DraggableComponent } from '@components/DraggableComponent/DraggableComponent';
import {
  addServiceModal,
  removeServiceModal,
  saveAddHocEvent,
  selectScheduleLoading,
  selectServiceModal,
  selectUserPermissions,
} from '@store/slices';
import { ServiceModalName, UserPermissions } from '@enums';
import { AddHocEventFormType, AddHocEventTypes, ServiceModalProps } from '@types';
import { useAppDispatch } from '@hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { AddServiceModalPlace } from '@enums/components/AddServiceModalPlace';
import { FormInputRadio } from '@components/FormComponents';
import React, { useEffect } from 'react';
import { Dictionaries, getOptionListFromCatalog } from '@utils/getOptionsListFormCatalog';
import { AddHocLabTestServiceForm } from './AddHocLabTestServiceForm';
import { AddHocHdServiceForm } from './AddHocHdServiceForm';
import { getTenantDate } from '@utils/getTenantDate';

const AddHocServicesModal = ({ index }: ServiceModalProps) => {
  const dispatch = useAppDispatch();
  const userPermissions = selectUserPermissions();
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('schedule');
  const {
    place,
    isolationGroupId,
    ...defaultValues
  }: { place: AddServiceModalPlace; isolationGroupId: string } & AddHocEventFormType = selectServiceModal(
    ServiceModalName.AddHocServicesModal,
  );
  const loading = selectScheduleLoading();

  const { trigger, control, handleSubmit, watch, setValue } = useForm<AddHocEventFormType>({
    mode: 'onBlur',
    defaultValues,
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const type = watch('type', AddHocEventTypes.HD);
  const { isDirty } = useFormState({ control });

  useEffect(() => {
    type === AddHocEventTypes.LAB_TEST && setValue('date', getTenantDate());
  }, [type]);

  const typeOptions = getOptionListFromCatalog(Dictionaries.AddHocEventTypes).map((option) => {
    if (option.value === AddHocEventTypes.LAB_TEST) {
      return {
        ...option,
        disabled:
          place === AddServiceModalPlace.SHIFT || !userPermissions.includes(UserPermissions.AnalysesModifyOrder),
      };
    }
    return option;
  });

  const getFormView = () => {
    switch (type) {
      case AddHocEventTypes.HD:
        return (
          <AddHocHdServiceForm
            isolationGroupId={isolationGroupId}
            control={control}
            watch={watch}
            setValue={setValue}
            place={place}
            trigger={trigger}
          />
        );
      case AddHocEventTypes.LAB_TEST:
        return <AddHocLabTestServiceForm control={control} setValue={setValue} watch={watch} />;
      default:
        return null;
    }
  };
  const onSubmit = (data: AddHocEventFormType) => {
    dispatch(saveAddHocEvent(data));
  };

  const onCloseHandler = () => {
    isDirty
      ? dispatch(
          addServiceModal({
            name: ServiceModalName.ConfirmModal,
            payload: {
              closeCallback: () => dispatch(removeServiceModal(ServiceModalName.AddHocServicesModal)),
              title: tCommon('closeWithoutSaving'),
              text: tCommon('dataLost'),
              confirmButton: tCommon('button.continue'),
              cancelButton: tCommon('button.cancel'),
            },
          }),
        )
      : dispatch(removeServiceModal(ServiceModalName.AddHocServicesModal));
  };

  return (
    <Dialog
      PaperComponent={DraggableComponent}
      open
      disableEnforceFocus
      onClose={onCloseHandler}
      data-testid="addHocServicesModal"
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
        <Typography variant="labelLSB">{t('addHocEventForm.addService')}</Typography>
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
        <Stack direction="column" spacing={2}>
          <FormInputRadio control={control} name="type" options={typeOptions} />
          {getFormView()}
        </Stack>
        <Stack spacing={2} direction="row" sx={{ flexWrap: 'no-wrap', paddingTop: 2 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={onCloseHandler}
            fullWidth
            data-testid="addHocServicesModalCancelButton"
          >
            {tCommon('button.cancel')}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            disabled={loading}
            data-testid="addHocServicesModalSaveButton"
          >
            {tCommon('button.save')}
            {loading && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddHocServicesModal;
