import { useForm, useFormState } from 'react-hook-form';
import { CreateIndividualLabTestPlanForm, CreateIndividualLabTestPlanFormRaw } from '@types';
import { AddIndividualLabTestPlanFormView } from '@containers/layouts/Drawer/components/AddIndividualLabTestPlanForm/AddIndividualLabTestPlanFormView';
import {
  addServiceModal,
  clearEditableLabTestPlan,
  submitLabOrderForm,
  getLabTestPlan,
  removeDrawer,
  selectDrawerPayload,
  selectEditableLabTestPlan,
  selectLabOrdersIsSubmitting,
} from '@store/slices';
import { DrawerType, FormType } from '@enums/containers';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { LabTestTypes, ServiceModalName } from '@enums';
import { useAppDispatch } from '@hooks';
import { format, parse } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { getTenantDate } from '@utils/getTenantDate';

const AddIndividualLabTestPlanForm = () => {
  const dispatch = useAppDispatch();
  const { t: tCommon } = useTranslation('common');
  const { formInitialValues, place, mode, planId } = selectDrawerPayload(DrawerType.IndividualLabTestPlanForm);
  const isSubmitting = selectLabOrdersIsSubmitting();
  const individualLabTestPlan = selectEditableLabTestPlan();

  const defaultValues =
    mode === FormType.Edit
      ? {
          patient: { label: individualLabTestPlan?.patientName, value: individualLabTestPlan?.patientId },
          procedure: { label: individualLabTestPlan?.procedureName, value: individualLabTestPlan?.procedureId },
          laboratory: { label: individualLabTestPlan?.labName, value: individualLabTestPlan?.labId },
          specimenType: individualLabTestPlan?.specimenType,
          dialysisDay: individualLabTestPlan?.dialysisBased || false,
          planeDates: individualLabTestPlan?.labOrders?.map(({ planDate, status }) => ({
            date: parse(planDate, 'yyyy-MM-dd', getTenantDate()),
            status,
          })),
        }
      : formInitialValues;

  const { control, watch, setValue, register, handleSubmit, reset } = useForm<CreateIndividualLabTestPlanFormRaw>({
    mode: 'onBlur',
    defaultValues: defaultValues,
    shouldUnregister: false,
    shouldFocusError: true,
  });
  const { isDirty } = useFormState({ control });

  useEffect(() => {
    if (mode === FormType.Edit && planId) {
      dispatch(getLabTestPlan(planId));
    }
    return () => {
      dispatch(clearEditableLabTestPlan());
    };
  }, []);

  useEffect(() => {
    individualLabTestPlan && reset(defaultValues);
  }, [individualLabTestPlan]);

  const handleClose = () => {
    isDirty
      ? dispatch(
          addServiceModal({
            name: ServiceModalName.ConfirmModal,
            payload: {
              closeCallback: () => dispatch(removeDrawer(DrawerType.IndividualLabTestPlanForm)),
              title: tCommon('continueWithoutSaving'),
              text: tCommon('allUnsavedDataWillBeLost'),
              confirmButton: tCommon('button.continue'),
            },
          }),
        )
      : dispatch(removeDrawer(DrawerType.IndividualLabTestPlanForm));
  };

  const onSubmit = (data: CreateIndividualLabTestPlanFormRaw) => {
    const dataToSend: CreateIndividualLabTestPlanForm = {
      patientId: data.patient!.value,
      procedureId: data.procedure!.value,
      labId: data.laboratory!.value,
      specimenType: data.specimenType,
      dialysisDay: data.dialysisDay,
      planedDates: data.planeDates.filter((date) => !!date).map(({ date }) => format(date as Date, 'yyyy-MM-dd')),
    };
    dispatch(
      submitLabOrderForm({
        id: individualLabTestPlan?.planId,
        type: LabTestTypes.IndividualLab,
        place,
        mode,
        formData: dataToSend,
      }),
    );
  };

  return (
    <Stack direction="column" pb={8.5}>
      {mode === FormType.Edit && !individualLabTestPlan ? (
        <>
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={112} variant="rectangular" />
        </>
      ) : (
        <>
          <AddIndividualLabTestPlanFormView
            control={control}
            watch={watch}
            setValue={setValue}
            isDirty={isDirty}
            register={register}
          />
          <Box
            sx={(theme) => ({
              px: 1,
              py: 1,
              bgcolor: theme.palette.surface.default,
              borderTop: `solid 1px ${theme.palette.border.default}`,
              position: 'absolute',
              bottom: 0,
              width: `calc(100% - ${theme.spacing(4.5)})`,
              zIndex: theme.zIndex.drawer,
            })}
          >
            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant={'outlined'}>
                {tCommon('button.cancel')}
              </Button>
              <Button onClick={handleSubmit(onSubmit)} variant={'contained'} disabled={isSubmitting}>
                {tCommon('button.save')}
                {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default AddIndividualLabTestPlanForm;
