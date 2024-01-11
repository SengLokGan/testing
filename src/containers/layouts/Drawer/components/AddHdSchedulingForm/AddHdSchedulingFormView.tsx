import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormClearErrors, UseFormGetFieldState, UseFormSetValue } from 'react-hook-form';
import { Control, UseFormSetError, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { FormDatePicker, FormInputRadio, FormInputSelect, FormInputText, FormShiftScheduler } from '@components';
import {
  validatorIsValidDate,
  validatorPastDate,
  validatorRequired,
  validatorTimeDurationIsInRange,
  validatorNotTheSameDateAs,
  validatorMaxDate,
  validatorNotEarlierThan,
} from '@validators';
import {
  countSessionsBetweenDates,
  Dictionaries,
  getOptionListFromCatalog,
  getTenantDate,
  getTenantStartCurrentDay,
  transformEventCommaToDot,
} from '@utils';
import { FormTimeDurationPicker } from '@components/FormComponents/FormTimeDurationPicker';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { HdSchedulingForm } from '@types';
import { useShiftsData, useIgnoreFirstRenderEffect } from '@hooks';
import {
  ShiftSchedulerErrorReason,
  DaysOfWeek,
  ThricePerWeek,
  TwicePerWeek,
  HDPrescriptionScheduleFrequency,
} from '@enums';
import { addMonths, format, isValid, startOfDay } from 'date-fns';
import { selectHasTodayEncounter, selectPatientIsolationStatus } from '@store';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Stack, Tooltip } from '@mui/material';
import { validatorHasTodayEncounter } from '@validators';

type AddHdSchedulingFormViewProps = {
  control: Control<HdSchedulingForm>;
  watch: UseFormWatch<HdSchedulingForm>;
  setValue: UseFormSetValue<HdSchedulingForm>;
  setError: UseFormSetError<HdSchedulingForm>;
  clearErrors: UseFormClearErrors<HdSchedulingForm>;
  trigger: UseFormTrigger<HdSchedulingForm>;
  defaultValues: HdSchedulingForm;
  getFieldState: UseFormGetFieldState<HdSchedulingForm>;
};

type OptionsType = {
  label: string;
  value: DaysOfWeek & TwicePerWeek & ThricePerWeek;
};

const ONE_HOUR = 60;
const EIGHT_HOUR = ONE_HOUR * 8;

export const AddHdSchedulingFormView = ({
  control,
  watch,
  setValue,
  setError,
  clearErrors,
  trigger,
  defaultValues,
  getFieldState,
}: AddHdSchedulingFormViewProps) => {
  const { t } = useTranslation('hdPrescription');
  const { t: tCommon } = useTranslation('common');
  const { t: tIsolations } = useTranslation(Dictionaries.Isolations);
  const frequency = watch('frequency');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const daysOfWeek = watch('daysOfWeek');
  const patientIsolationStatus = selectPatientIsolationStatus();
  const hasTodayEncounter = selectHasTodayEncounter();
  const { shiftsData, isLoading } = useShiftsData(patientIsolationStatus?.id, startDate);
  const daysForScheduling = useMemo(() => {
    return (daysOfWeek?.split('_')?.filter((day) => !!day) as DaysOfWeek[]) ?? [];
  }, [daysOfWeek]);
  const { isTouched: isTouchedEndDate } = getFieldState('endDate');

  const onShiftErrorHandler = (reason: ShiftSchedulerErrorReason | null) => {
    if (isLoading) return null;
    switch (reason) {
      case ShiftSchedulerErrorReason.SHIFTS_UNAVAILABLE: {
        setError('shift', { type: 'custom', message: t(`validation.${reason}`) });
        break;
      }
      case ShiftSchedulerErrorReason.DAYS_UNAVAILABLE: {
        setError('daysOfWeek', { type: 'custom', message: t(`validation.${reason}`) });
        break;
      }
      default: {
        clearErrors('shift');
        clearErrors('daysOfWeek');
        break;
      }
    }
  };

  const sessionsHandler = (
    startDate: Date | null | string,
    endDate: Date | null | string,
    selectedDays: DaysOfWeek[],
  ) => {
    const sessionCount = countSessionsBetweenDates(startDate, endDate, selectedDays);
    setValue('hdSession', sessionCount);
    trigger('hdSession');
  };

  const daysOfWeekOptions = useMemo(() => {
    const options = getOptionListFromCatalog(Dictionaries.DaysOfWeek) as OptionsType[];
    switch (true) {
      case frequency === HDPrescriptionScheduleFrequency.ONCE_PER_WEEK: {
        const oncePerWeekDays = Object.values(DaysOfWeek);
        return options.filter((option) => oncePerWeekDays.includes(option.value));
      }
      case frequency === HDPrescriptionScheduleFrequency.TWICE_PER_WEEK: {
        const twicePerWeekDays = Object.values(TwicePerWeek);
        return options.filter((option) => twicePerWeekDays.includes(option.value));
      }
      case frequency === HDPrescriptionScheduleFrequency.THREE_TIMES_PER_WEEK: {
        const thricePerWeekDays = Object.values(ThricePerWeek);
        return options.filter((option) => thricePerWeekDays.includes(option.value));
      }
      default:
        return options;
    }
  }, [frequency]);

  useIgnoreFirstRenderEffect(() => {
    setValue('daysOfWeek', '' as any);
    trigger('daysOfWeek');
  }, [frequency]);

  useEffect(() => {
    sessionsHandler(startDate, endDate, daysForScheduling);
  }, [startDate, endDate, daysForScheduling]);

  useEffect(() => {
    isTouchedEndDate && startDate !== new Date() && trigger('endDate');
  }, [startDate, isTouchedEndDate]);

  return (
    <>
      <Divider sx={{ mx: ({ spacing }) => `${spacing(-2)} !important` }} />
      <Typography variant="labelMCapsSB" sx={(theme) => ({ color: theme.palette.text.secondary })}>
        {t('form.frequency')}
      </Typography>
      <FormInputRadio options={getOptionListFromCatalog(Dictionaries.Frequency)} control={control} name="frequency" />
      <FormInputSelect
        options={daysOfWeekOptions}
        control={control}
        name="daysOfWeek"
        isDisabled={!frequency}
        label={t('form.days')}
        required
        rules={{
          required: validatorRequired(),
        }}
      />
      {patientIsolationStatus && patientIsolationStatus?.isolations?.length > 0 && (
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="labelL" mr={0.8}>
            {patientIsolationStatus?.name}
          </Typography>
          <Tooltip
            title={patientIsolationStatus.isolations.map((isolationKey) => tIsolations(isolationKey)).join(' + ')}
          >
            <HelpOutlineOutlinedIcon sx={{ '&:hover': { color: ({ palette }) => palette.primary.main } }} />
          </Tooltip>
        </Stack>
      )}
      {patientIsolationStatus && patientIsolationStatus?.isolations?.length === 0 && (
        <Typography variant="labelL" mr={0.8}>
          {tCommon('nonInfectious')}
        </Typography>
      )}
      {frequency && (
        <FormShiftScheduler
          control={control}
          name="shift"
          onError={onShiftErrorHandler}
          data={shiftsData}
          defaultValue={defaultValues.shift}
          frequency={frequency}
          availableDays={daysForScheduling}
        />
      )}
      <FormTimeDurationPicker
        control={control}
        trigger={trigger}
        watch={watch}
        name="duration"
        label={t('form.sessionDuration')}
        required
        rules={{
          required: validatorRequired(),
          validate: {
            durationTime: validatorTimeDurationIsInRange(ONE_HOUR, EIGHT_HOUR),
          },
        }}
      />
      <FormDatePicker
        control={control}
        name="startDate"
        label={t('form.startDate')}
        required
        minDate={getTenantStartCurrentDay()}
        rules={{
          required: validatorRequired(),
          validate: {
            isValid: validatorIsValidDate,
            isPast: validatorPastDate,
            hasTodayEncounter: validatorHasTodayEncounter(hasTodayEncounter),
          },
        }}
      />
      <FormDatePicker
        control={control}
        name="endDate"
        label={t('form.endDate')}
        required
        minDate={startOfDay(getTenantDate(startDate as Date))}
        rules={{
          required: validatorRequired(),
          validate: {
            isValid: validatorIsValidDate,
            isPast: validatorPastDate,
            isFromGivenDate: validatorNotEarlierThan(startDate as Date),
            maxDate: validatorMaxDate(
              startOfDay(addMonths(new Date(startDate!), 3)),
              t('form.startDate'),
              tCommon(`validation.enteredDateShouldNotBeLaterThan`, {
                date: isValid(startDate) ? format(addMonths(new Date(startDate!), 3), 'dd/MM/yyyy') : '',
              }),
            ),
            isSameDate: validatorNotTheSameDateAs(startDate as Date, 'Start date'),
          },
        }}
      />
      <FormInputText
        control={control}
        name="hdSession"
        label={t('form.hdSession')}
        isDisabled
        transform={transformEventCommaToDot}
      />
    </>
  );
};
