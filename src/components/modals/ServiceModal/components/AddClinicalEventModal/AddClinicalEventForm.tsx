import {
  FormAutocomplete,
  FormAutocompleteAsync,
  FormDatePicker,
  FormInputCheckbox,
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FormTimePicker,
} from '@components/FormComponents';
import {
  validatorRequired,
  validatorMinLength,
  validatorMaxLength,
  validatorLatinLettersNumberCharacters,
  validatorAutocompleteRequired,
  validatorIsValidDate,
  validatorPastDate,
  validatorIsExistQuarterlyBT,
  validatorFutureTime,
  validatorPastTime,
  validatorTimeNotEarlierThan,
} from '@validators';
import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { API } from '@utils/api';
import { getTenantStartCurrentDay } from '@utils/getTenantDate';
import { selectClinicalShiftList, selectEvents } from '@store/slices';
import { ClinicalEventFormType } from '@types';
import { parse, addMinutes, subMinutes } from 'date-fns';
import { DoctorSpecialities } from '@enums/global';
import Typography from '@mui/material/Typography';
import { TargetAudience } from '@enums/components/TargetAudience';
import { WarningMessage } from '@components';

const typeOptions = [
  { label: i18n.t('schedule:events.QUARTERLY_BLOOD_TEST'), value: ClinicalScheduleEventType.QuarterlyBloodTest },
  { label: i18n.t('schedule:events.NEPHROLOGIST_VISIT'), value: ClinicalScheduleEventType.NephrologistVisit },
  { label: i18n.t('schedule:events.PIC_VISIT'), value: ClinicalScheduleEventType.PICVisit },
  { label: i18n.t('schedule:events.CUSTOM'), value: ClinicalScheduleEventType.CustomEvent },
];

type AddClinicalEventFormProps = {
  control: Control<ClinicalEventFormType>;
  watch: UseFormWatch<ClinicalEventFormType>;
  editedEventId?: string;
};

export const AddClinicalEventForm = ({ control, watch, editedEventId }: AddClinicalEventFormProps) => {
  const [labOptions, setLabOptions] = useState([]);
  const { t } = useTranslation('schedule');

  const eventType = watch('type');
  const startTime = watch('startTime');
  const isAllDay = watch('isAllDay');
  const targetAudience = watch('targetAudience', TargetAudience.AssignedPatients);
  const dialysisRelated = watch('dialysisRelated', true);

  const events = selectEvents();
  const shifts = selectClinicalShiftList();

  const startShiftsTime = shifts[0].timeStart && subMinutes(parse(shifts[0].timeStart, 'HH:mm:ss', new Date()), 1);
  const endShiftsTime =
    shifts[shifts.length - 1].timeEnd &&
    addMinutes(parse(shifts[shifts.length - 1].timeEnd, 'HH:mm:ss', new Date()), 1);

  const getLabList = async () => {
    API.get('/pm/labs')
      .then(({ data }) => {
        setLabOptions(data.map((option) => ({ label: option.name, value: option.id })));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLabList();
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <FormInputSelect
        required
        control={control}
        name="type"
        label={t('form.eventType')}
        isDisabled={!!editedEventId}
        options={typeOptions}
        rules={{
          required: validatorRequired(),
        }}
      />
      {eventType === ClinicalScheduleEventType.CustomEvent && (
        <FormInputText
          control={control}
          name="title"
          label={t('form.title')}
          multiline
          required
          rules={{
            required: validatorRequired(),
            minLength: validatorMinLength(1, 100),
            maxLength: validatorMaxLength(1, 100),
            pattern: validatorLatinLettersNumberCharacters(),
          }}
        />
      )}
      {eventType === ClinicalScheduleEventType.QuarterlyBloodTest && (
        <FormAutocomplete
          required
          name="laboratory"
          control={control}
          label={t('form.labName')}
          options={labOptions}
          rules={{
            required: validatorAutocompleteRequired(),
          }}
        />
      )}
      {(eventType === ClinicalScheduleEventType.NephrologistVisit ||
        eventType === ClinicalScheduleEventType.PICVisit) && (
        <FormAutocompleteAsync
          required
          name="doctor"
          control={control}
          label={t('form.doctorName')}
          getOptionsUrl={`/pm/doctors?speciality=${
            eventType === ClinicalScheduleEventType.PICVisit
              ? DoctorSpecialities.DoctorInCharge
              : DoctorSpecialities.DoctorNephrologist
          }&name=`}
          optionsTransform={(doctors) =>
            doctors
              .map((doctor) => {
                if (doctor.deleted) return null;
                return { label: doctor.name, value: doctor?.specialities[0]?.id };
              })
              .filter((item) => !!item)
          }
          rules={{
            required: validatorAutocompleteRequired(),
          }}
        />
      )}
      <FormInputText
        control={control}
        name="comment"
        label={t('form.comment')}
        multiline
        rules={{
          minLength: validatorMinLength(1, 200),
          maxLength: validatorMaxLength(1, 200),
          pattern: validatorLatinLettersNumberCharacters(),
        }}
      />
      {(eventType === ClinicalScheduleEventType.NephrologistVisit ||
        eventType === ClinicalScheduleEventType.PICVisit) && (
        <FormInputRadio
          control={control}
          name="targetAudience"
          customRadioLabelRender={(value, label) => {
            return (
              <>
                <Typography
                  variant="labelL"
                  sx={(theme) => ({
                    color: theme.palette.text.primary,
                    maxWidth: 'content',
                    mt: 1,
                  })}
                >
                  {label}
                </Typography>
                {targetAudience === value && (
                  <>
                    <FormInputCheckbox
                      control={control}
                      name="dialysisRelated"
                      label={t('form.dialysisDayOnly')}
                      sx={{ mb: 2, mt: 2 }}
                    />
                    {dialysisRelated && <WarningMessage text={t('form.warning')} />}
                  </>
                )}
              </>
            );
          }}
          labelSx={{
            alignItems: 'start',
            mr: 0,
          }}
          options={[
            { label: t('form.forAssignedPatients'), value: TargetAudience.AssignedPatients },
            { label: t('form.forAllPatients'), value: TargetAudience.AllPatients },
          ]}
        />
      )}
      <FormDatePicker
        control={control}
        name="date"
        label={t('form.date')}
        required
        minDate={getTenantStartCurrentDay()}
        isDisabled={!eventType}
        rules={{
          required: validatorRequired(),
          validate: {
            isValid: validatorIsValidDate,
            isPast: validatorPastDate,
            isExistQuarterlyBT: validatorIsExistQuarterlyBT(eventType, events, editedEventId),
          },
        }}
      />
      <FormInputCheckbox control={control} name="isAllDay" label={t('form.isAllDay')} sx={{ mb: 2, mt: 2 }} />
      <Stack direction="row" spacing={1}>
        <FormTimePicker
          control={control}
          name={'startTime'}
          label={t('form.startTime')}
          required={!isAllDay}
          isDisabled={isAllDay}
          minTime={startShiftsTime}
          maxTime={endShiftsTime}
          ampm={false}
          rules={{
            validate: {
              isValid: validatorIsValidDate,
              required: (value, { isAllDay }) => {
                const message = i18n.t(`common:validation.required`);
                return isAllDay || !!value || message;
              },
              maxDate: validatorFutureTime(endShiftsTime, t('validations.notBeLater')),
              minDate: validatorPastTime(startShiftsTime, t('validations.notBeEarlier')),
            },
          }}
        />
        <FormTimePicker
          control={control}
          name={'endTime'}
          label={t('form.endTime')}
          required={!isAllDay}
          isDisabled={isAllDay}
          minTime={startShiftsTime}
          maxTime={endShiftsTime}
          ampm={false}
          rules={{
            validate: {
              isValid: validatorIsValidDate,
              required: (value, { isAllDay }) => {
                const message = i18n.t(`common:validation.required`);
                return isAllDay || !!value || message;
              },
              maxDate: validatorFutureTime(endShiftsTime, t('validations.notBeLater')),
              minDate: validatorPastTime(startShiftsTime, t('validations.notBeEarlier')),
              notEarlierThan: validatorTimeNotEarlierThan(startTime, t('validations.earlierThanStart')),
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
