import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { dateFormat, getCodeValueFromCatalog, getTimeFromDate } from '@utils';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ButtonProps } from '@mui/material/Button/Button';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  abortDialysis,
  closeDialysisModal,
  finishAndSaveHdClick,
  finishHdClick,
  selectDialysisAppointmentDate,
  selectDialysisIsFutureAppointment,
  selectDialysisSkipInfo,
  selectHemodialysisService,
  selectIsDisableInterface,
  selectWithDialysis,
  setCurrentStep,
  startHdClick,
} from '@store/slices/dialysisSlice';
import { selectSystemIsOnline } from '@store/slices/systemSlice';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { DialysisStatus, PatientStatuses, ServiceModalName } from '@enums';
import { Event } from '@services';
import { convertSxToArray } from '@utils/converters/mui';
import { format } from 'date-fns';
import { DialysisPatient } from '@types';
import Tooltip from '@mui/material/Tooltip';

type Status = {
  activeStep: DialysisStatus;
  currentStep: DialysisStatus;
};

type HeaderProps = {
  patient: DialysisPatient;
  status: Status;
};

const allSteps = [
  DialysisStatus.CheckIn,
  DialysisStatus.PreDialysis,
  DialysisStatus.HDReading,
  DialysisStatus.PostDialysis,
  DialysisStatus.Completed,
];

const StepButton = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      {...props}
      sx={[
        {
          borderRadius: (theme) => theme.spacing(8.333),
          textTransform: 'none',
          '&.Mui-disabled': {
            border: 'unset',
            color: (theme) => theme.palette.neutral[60],
          },
        },
        ...convertSxToArray(props.sx),
      ]}
    >
      {children}
    </Button>
  );
};

export const Header = ({ patient, status }: HeaderProps) => {
  const { t } = useTranslation('dialysis');
  const { t: tCommon } = useTranslation('common');
  const networkConnectionStatus = selectSystemIsOnline();
  const appointmentDate = selectDialysisAppointmentDate();
  const formatAppointmentDate = appointmentDate && dateFormat(appointmentDate);
  const dispatch = useAppDispatch();
  const isDisabledInterface = selectIsDisableInterface();
  const isFutureAppointment = selectDialysisIsFutureAppointment();
  const skipInfo = selectDialysisSkipInfo();
  const prescription = selectHemodialysisService();
  const withDialysis = selectWithDialysis();
  const [steps, setSteps] = useState<DialysisStatus[]>(allSteps);

  useEffect(() => {
    setSteps(withDialysis ? allSteps : allSteps.filter((step) => step === DialysisStatus.CheckIn));
  }, [withDialysis]);

  const isUnavailableStatus =
    patient?.status === PatientStatuses.Walk_In ||
    patient?.status === PatientStatuses.Dead ||
    patient?.status === PatientStatuses.Discharged;
  const setStep = (step: DialysisStatus) => dispatch(setCurrentStep(step));

  const activeStepIndex = steps.indexOf(status.activeStep);
  const currentStepIndex = steps.indexOf(status.currentStep);

  const getStepButtonsTitle = (step: string) => {
    switch (step) {
      case DialysisStatus.CheckIn:
        return t('services');
      case DialysisStatus.PreDialysis:
        return t('preHd');
      case DialysisStatus.HDReading:
        return t('hdReading');
      case DialysisStatus.PostDialysis:
        return t('postHd');
    }
  };

  const onClose = useCallback(() => Event.fire(closeDialysisModal.type), [Event]);

  const onContinueClick = useCallback(() => setStep(DialysisStatus.PreDialysis), [setStep]);

  const onAbortClick = useCallback(() => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => {
            dispatch(abortDialysis());
          },
          title: t('areYouSureYouWantToAbort'),
          text: t('allDataWillBeLost'),
          confirmButton: t('buttons.abortHd'),
          cancelButton: tCommon('button.cancel'),
        },
      }),
    );
  }, [dispatch]);

  const onStartHDClick = useCallback(() => Event.fire(startHdClick.type), [Event]);

  const onFinishHDClick = useCallback(() => Event.fire(finishHdClick.type), [Event]);

  const onFinishAndSaveButton = useCallback(() => Event.fire(finishAndSaveHdClick.type), [Event]);

  const ContinueButton = useCallback(
    () => (
      <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
        <span>
          <Button
            onClick={onContinueClick}
            variant="contained"
            disabled={!networkConnectionStatus || isUnavailableStatus}
          >
            {t('buttons.continue')}
          </Button>
        </span>
      </Tooltip>
    ),
    [onContinueClick, networkConnectionStatus],
  );

  const AbortButton = useCallback(
    () => (
      <Button data-testid="abortDialysisButton" onClick={onAbortClick}>
        {t('buttons.abortHd')}
      </Button>
    ),
    [onAbortClick],
  );

  const StartHDButton = useCallback(
    () => (
      <Button onClick={onStartHDClick} variant="contained" disabled={!networkConnectionStatus}>
        {t('buttons.startHd')}
        <SmartDisplayOutlinedIcon sx={(theme) => ({ color: theme.palette.primary[100], ml: 1.5 })} />
      </Button>
    ),
    [onStartHDClick, networkConnectionStatus],
  );

  const FinishHDButton = useCallback(
    () => (
      <Button onClick={onFinishHDClick} variant="contained" disabled={!networkConnectionStatus}>
        {t('buttons.finishHd')}
        <TaskAltIcon sx={(theme) => ({ color: theme.palette.primary[100], ml: 1.5 })} />
      </Button>
    ),
    [onFinishHDClick, networkConnectionStatus],
  );

  const FinishAndSaveButton = useCallback(
    () => (
      <Button onClick={onFinishAndSaveButton} variant="contained" disabled={!networkConnectionStatus}>
        {t('buttons.finishAndSave')}
      </Button>
    ),
    [onFinishAndSaveButton, networkConnectionStatus],
  );

  const getControlButtons = useCallback(() => {
    if (isFutureAppointment || skipInfo?.skipComment || !prescription) return null;
    const isShowControlButton = status.activeStep === status.currentStep;

    switch (status.activeStep) {
      case DialysisStatus.CheckIn:
        return <ContinueButton />;
      case DialysisStatus.PreDialysis:
        return (
          <>
            <AbortButton />
            {isShowControlButton && <StartHDButton />}
          </>
        );
      case DialysisStatus.HDReading:
        return (
          <>
            <AbortButton />
            {isShowControlButton && <FinishHDButton />}
          </>
        );
      case DialysisStatus.PostDialysis:
        return (
          <>
            <AbortButton />
            {isShowControlButton && <FinishAndSaveButton />}
          </>
        );
      default:
        return null;
    }
  }, [status, isFutureAppointment, skipInfo]);

  return (
    <Box
      sx={(theme) => ({
        p: `${theme.spacing(1)} ${theme.spacing(3)} ${theme.spacing(1.25)} ${theme.spacing(3)}`,
        backgroundColor: theme.palette.primary.light,
      })}
      data-testid="dialysisProcedureModalHeader"
    >
      <Stack direction="column" spacing={1.75}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            disabled={!networkConnectionStatus}
            onClick={onClose}
            sx={{ m: 0 }}
            data-testid="closeModalButton"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="headerS">
            {`${patient?.patientName} - ${patient?.document?.number} - ${getTimeFromDate(patient?.birthDate)} - ${
              patient?.gender?.code !== 'other'
                ? getCodeValueFromCatalog('gender', patient.gender.code)
                : patient?.gender.extValue
            }${
              status.activeStep === DialysisStatus.Completed &&
              formatAppointmentDate?.toString() !== format(new Date(), 'dd/MM/yyyy').toString()
                ? ` – ${formatAppointmentDate}`
                : ''
            }`}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            {isFutureAppointment || !prescription ? (
              <StepButton variant="contained">{getStepButtonsTitle(DialysisStatus.CheckIn)}</StepButton>
            ) : (
              steps.map((step, index) => {
                if (step !== DialysisStatus.Completed) {
                  return (
                    <StepButton
                      key={step}
                      variant={index === currentStepIndex ? 'contained' : 'outlined'}
                      onClick={() => setStep(step)}
                      data-testid={`${step}Button`}
                      disabled={
                        Boolean(index > activeStepIndex) ||
                        (Boolean(index !== activeStepIndex) && !networkConnectionStatus)
                      }
                    >
                      {getStepButtonsTitle(step)}
                    </StepButton>
                  );
                }
              })
            )}
          </Stack>
          {status.activeStep && !isDisabledInterface && withDialysis && (
            <Stack direction="row" spacing={1} data-testid="dialysisServicesModalControlButtons">
              {getControlButtons()}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
