import { useEffect, useState } from 'react';
import { Control, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PreHDForm } from '@types';
import { InfoCard } from '@components/InfoCard/InfoCard';
import { FormDatePicker, FormInputSelect, FormInputText, SelectOptionProps } from '@components';
import { validatorIsValidDate, validatorRequired, validatorTimeDurationIsInRange } from '@validators';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { FormTimeDurationPicker } from '@components/FormComponents/FormTimeDurationPicker';
import { API } from '@utils';
import { selectDialysisAppointmentId, selectIsDisableInterface } from '@store';
import { EIGHT_HOUR, ONE_HOUR } from '@constants';
import Typography from '@mui/material/Typography';

type PreHdAccessManagementProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  trigger: UseFormTrigger<PreHDForm>;
};

const DialysisPreHdStepInitialInfoGroup = ({ control, watch, trigger }: PreHdAccessManagementProps) => {
  const { t } = useTranslation('dialysis');
  const [bayOptions, setBayOptions] = useState<SelectOptionProps[]>([]);
  const appointmentId = selectDialysisAppointmentId();
  const isDisabledInterface = selectIsDisableInterface();

  useEffect(() => {
    API.get(`/pm/appointments/${appointmentId}/locations`)
      .then(({ data }) => {
        setBayOptions(data.map((option) => ({ label: option.name, value: option.id })));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <InfoCard title={t('form.initialInfo')}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormInputSelect
            emptyBody={<Typography variant="labelM">{t('noAvailableBays')}</Typography>}
            options={bayOptions}
            control={control}
            name="initialBayNumber"
            label={t('form.bayNumber')}
            required
            isDisabled={isDisabledInterface}
            rules={{
              required: validatorRequired(),
            }}
          />
          <FormInputText control={control} name="initialTreatmentNumber" label={t('form.treatmentNumber')} isDisabled />
          <FormDatePicker
            control={control}
            name="initialToday"
            isDisabled={isDisabledInterface}
            label={t('form.date')}
            rules={{
              validate: {
                isValid: validatorIsValidDate,
              },
            }}
          />
        </Stack>
        <FormTimeDurationPicker
          control={control}
          watch={watch}
          trigger={trigger}
          name="initialDuration"
          label={t('form.duration')}
          sx={{ maxWidth: (theme) => theme.spacing(25.625) }}
          required
          isDisabled={isDisabledInterface}
          rules={{
            required: validatorRequired(),
            validate: {
              durationTime: validatorTimeDurationIsInRange(ONE_HOUR, EIGHT_HOUR),
            },
          }}
        />
      </Stack>
    </InfoCard>
  );
};

export default DialysisPreHdStepInitialInfoGroup;
