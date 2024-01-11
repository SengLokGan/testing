import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { GlobalLoader } from '@components/GlobalLoader/GlobalLoader';
import {
  clearInitialDialysisData,
  closeDialysisModal,
  finishAndSaveHd,
  finishAndSaveHdClick,
  savePostHd,
  selectDialysisIsSubmitting,
  selectDialysisLoading,
  selectDialysisPostHd,
} from '@store/slices/dialysisSlice';
import { DialysisPostHdWeight } from './components/DialysisPostHdWeight';
import { useForm, useFormState } from 'react-hook-form';
import { DialysisBloodPressureTempGroup } from './components/DialysisBloodPressureTempGroup';
import { DialysisPatientsConditionGroup } from './components/DialysisPatientsConditionGroup';
import { DialysisAccessConditionGroup } from './components/DialysisAccessConditionGroup';
import { DialysisPostHdBleedingStatus } from './components/DialysisPostHdBleedingStatus';
import { DialysisPostHdTiming } from './components/DialysisPostHdTiming';
import { DialysisPostHdSummary } from './components/DialysisPostHdSummary';
import { CancelSaveButtonsBlock } from './components/CancelSaveButtonsBlock';
import { useAppDispatch } from '@hooks/storeHooks';
import { WarningIcon } from '@assets/icons';
import ConfirmModal from '@components/modals/ConfirmModal/ConfirmModal';
import { ROUTES } from '@constants';
import { getTodayPatientsAppointments } from '@store/slices/todayPatientsSlice';
import { getDialysisProcessInfo, selectPatientId } from '@store/slices/patientSlice';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import {
  ServiceModalName,
  PostHdBleedingStatus,
  PostHdSummary,
  AccessCondition,
  PatientCondition,
  DialysisSubmitSource,
} from '@enums';
import { Event } from '@services/Event/Event';
import { useConfirmNavigation } from '@hooks/useConfirmNavigation';
import { usePageUnload } from '@hooks/usePageUnload';
import { PostHdRequest, PostHDForm } from '@types';

export const DialysisPostHdStep = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const isLoading = selectDialysisLoading();
  const isSubmitting = selectDialysisIsSubmitting();
  const postHd = selectDialysisPostHd();
  const dispatch = useAppDispatch();
  const patientId = selectPatientId();
  const { t } = useTranslation('dialysis');
  const { t: tCommon } = useTranslation('common');

  const parseWeightLossResult = (preWeight: number, postWeight: number) => {
    const result = preWeight - postWeight;
    const isInteger = (result ^ 0) === result;
    return `${isInteger ? result : result.toFixed(1)}`;
  };

  const getWeightLoss = () => {
    if (postHd?.weight.postSessionWeight && postHd?.weight.preSessionWeight) {
      return parseWeightLossResult(Number(postHd.weight.preSessionWeight), Number(postHd.weight.postSessionWeight));
    }
    return '';
  };

  const getPatientConditionValue = () => {
    if (postHd?.patientCondition) {
      return postHd.patientCondition === t(`form.${PatientCondition.Acceptable}`)
        ? PatientCondition.Acceptable
        : PatientCondition.SomeIssues;
    }
    return PatientCondition.Acceptable;
  };

  const getAccessConditionValue = () => {
    if (postHd?.accessCondition) {
      return postHd.accessCondition === t(`form.${AccessCondition.NoProblemsPostHd}`)
        ? AccessCondition.NoProblemsPostHd
        : AccessCondition.SomeIssues;
    }
    return AccessCondition.NoProblemsPostHd;
  };

  const getBleedingStatus = () => {
    if (postHd?.bleedingStatus) {
      return postHd.bleedingStatus === t(`form.${PostHdBleedingStatus.WithoutDifficulties}`)
        ? PostHdBleedingStatus.WithoutDifficulties
        : PostHdBleedingStatus.SomeIssues;
    }
    return PostHdBleedingStatus.WithoutDifficulties;
  };

  const getFormValue = (formValue: string | undefined, defaultValue = '') => {
    return formValue || defaultValue;
  };

  const defaultValues: PostHDForm = {
    postSessionWeight: postHd?.weight?.postSessionWeight
      ? { label: postHd?.weight?.postSessionWeight, value: postHd?.weight?.postSessionWeight }
      : { label: '', value: '' },
    weightLoss: getWeightLoss(),
    standingSystolicBloodPressure: getFormValue(postHd?.indicators?.standingSystolicBloodPressure),
    standingDiastolicBloodPressure: getFormValue(postHd?.indicators?.standingDiastolicBloodPressure),
    standingPulse: getFormValue(postHd?.indicators?.standingPulse),
    sittingSystolicBloodPressure: getFormValue(postHd?.indicators?.sittingSystolicBloodPressure),
    sittingDiastolicBloodPressure: getFormValue(postHd?.indicators?.sittingDiastolicBloodPressure),
    sittingPulse: getFormValue(postHd?.indicators?.sittingPulse),
    bodyTemperature: getFormValue(postHd?.indicators?.bodyTemperature),
    patientCondition: getPatientConditionValue(),
    patientConditionExtValue:
      postHd && postHd.patientCondition === PatientCondition.Acceptable ? '' : postHd?.patientCondition || '',
    accessCondition: getAccessConditionValue(),
    accessConditionExtValue:
      postHd && postHd.accessCondition === AccessCondition.NoProblemsPostHd ? '' : postHd?.accessCondition || '',
    bleedingStatus: getBleedingStatus(),
    bleedingStatusExtValue:
      postHd && postHd.bleedingStatus === PostHdBleedingStatus.WithoutDifficulties ? '' : postHd?.bleedingStatus || '',
    summaryType: postHd?.summary?.type || PostHdSummary.Uneventful,
    summaryText: getFormValue(postHd?.summary?.text),
  };

  const { handleSubmit, control, watch, reset, setValue } = useForm<PostHDForm>({
    mode: 'onBlur',
    defaultValues,
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const { isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    if (postHd) {
      reset(defaultValues);
    }
  }, [postHd]);

  useEffect(() => {
    const onFinishAndSaveHdClick = () => {
      if (!isValid || isDirty) {
        onSubmit(DialysisSubmitSource.HEADER);
      } else {
        dispatch(finishAndSaveHd());
      }
    };

    Event.subscribe(finishAndSaveHdClick.type, onFinishAndSaveHdClick);
    return () => Event.unsubscribe(finishAndSaveHdClick.type, onFinishAndSaveHdClick);
  }, [isValid, isDirty]);

  useEffect(() => {
    const onCloseDialysisModal = () => (isDirty ? setOpenConfirmModal(true) : handleConfirmClose());
    Event.subscribe(closeDialysisModal.type, onCloseDialysisModal);
    return () => Event.unsubscribe(closeDialysisModal.type, onCloseDialysisModal);
  }, [isDirty]);

  const resetValues = useCallback(() => reset(defaultValues), [defaultValues]);

  const onFormSubmit = useCallback(() => onSubmit(DialysisSubmitSource.FORM), [isValid]);

  const onSubmit = (source: DialysisSubmitSource) => {
    handleSubmit((data) => {
      const preparedData: PostHdRequest = {
        weight: {
          postSessionWeight: data.postSessionWeight.value,
        },
        indicators: {
          standingSystolicBloodPressure: data.standingSystolicBloodPressure,
          standingDiastolicBloodPressure: data.standingDiastolicBloodPressure,
          standingPulse: data.standingPulse,
          sittingSystolicBloodPressure: data.sittingSystolicBloodPressure,
          sittingDiastolicBloodPressure: data.sittingDiastolicBloodPressure,
          sittingPulse: data.sittingPulse,
          bodyTemperature: data.bodyTemperature,
        },
        patientCondition: data.patientCondition === PatientCondition.Acceptable ? '' : data.patientConditionExtValue,
        accessCondition: data.accessCondition === AccessCondition.NoProblemsPostHd ? '' : data.accessConditionExtValue,
        bleedingStatus:
          data.bleedingStatus === PostHdBleedingStatus.WithoutDifficulties ? '' : data.bleedingStatusExtValue,
        summary: {
          type: data.summaryType,
          text: data.summaryText,
        },
        source,
      };

      dispatch(savePostHd(preparedData));
    })();
  };

  useConfirmNavigation(isDirty, []);
  usePageUnload(isDirty, tCommon('dataLost'));

  const handleConfirmClose = () => {
    if (location.pathname === ROUTES.main) {
      dispatch(getTodayPatientsAppointments());
    } else if (patientId) {
      dispatch(getDialysisProcessInfo(patientId));
    }

    dispatch(clearInitialDialysisData());
    dispatch(removeServiceModal(ServiceModalName.DialysisProcedureModal));
  };

  return (
    <>
      {isLoading && (
        <Backdrop sx={(theme) => ({ color: theme.palette.primary[100], zIndex: theme.zIndex.snackbar + 1 })} open>
          <GlobalLoader />
        </Backdrop>
      )}
      <ConfirmModal
        onClose={() => setOpenConfirmModal(false)}
        title={tCommon('wantToQuit')}
        text={tCommon('dataLost')}
        icon={WarningIcon}
        confirmButton={{ children: tCommon('button.quit'), onClick: handleConfirmClose }}
        cancelButton={{ children: tCommon('button.cancel') }}
        isOpen={openConfirmModal}
      />
      <Stack
        direction="column"
        spacing={2}
        sx={{ pt: 2, pb: 7, maxWidth: (theme) => theme.spacing(87), width: 1, mx: 'auto', position: 'relative' }}
        data-testid="dialysisPostHdStep"
      >
        <DialysisPostHdWeight
          control={control}
          watch={watch}
          setValue={setValue}
          preSessionWeight={postHd?.weight.preSessionWeight}
          parseWeightLossResult={parseWeightLossResult}
        />
        <DialysisBloodPressureTempGroup control={control} />
        <DialysisPatientsConditionGroup control={control} watch={watch} />
        <DialysisAccessConditionGroup control={control} watch={watch} />
        <DialysisPostHdBleedingStatus control={control} watch={watch} />
        <DialysisPostHdTiming />
        <DialysisPostHdSummary control={control} />
        <CancelSaveButtonsBlock
          isDirty={isDirty}
          reset={resetValues}
          onSubmit={onFormSubmit}
          isSubmitting={isSubmitting}
        />
      </Stack>
    </>
  );
};
