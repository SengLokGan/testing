import { useCallback, useEffect, useMemo, useState } from 'react';
import { Control, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form/dist/types/form';
import { PatientWeightsResponse, PreHDForm } from '@types';
import { InfoCard } from '@components/InfoCard/InfoCard';
import { FormAutocompleteFreeSolo, FormInputText } from '@components';
import {
  validatorAutocompleteDecimalAmountIsInRange,
  validatorAutocompleteMaxLength,
  validatorAutocompleteMinLength,
  validatorAutocompleteNumberDecimal,
  validatorAutocompleteRequired,
  validatorDecimalAmountIsInRange,
  validatorMaxLength,
  validatorMinLength,
  validatorNumberDecimal,
  validatorNumberInt,
  validatorNumberPositiveNegative,
  validatorRequired,
} from '@validators';
import { useTranslation } from 'react-i18next';
import { API, dateFormat, toAmPmTimeString, transformEventCommaToDot, transformObjectComaToDot } from '@utils';
import { Grid } from '@mui/material';
import { selectDialysisPatient, selectIsDisableInterface } from '@store/slices/dialysisSlice';
import { validatorPositiveNegativeNumberInt } from '@validators/validatorPositiveNegativeNumberInt';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type DialysisPreHdWeightAndUfGroupProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  setValue: UseFormSetValue<PreHDForm>;
  trigger: UseFormTrigger<PreHDForm>;
};

const DialysisPreHdWeightAndUfGroup = ({ control, watch, setValue, trigger }: DialysisPreHdWeightAndUfGroupProps) => {
  const { t } = useTranslation('dialysis');
  const { t: tCommon } = useTranslation('common');
  const preSessionWeight = watch('preSessionWeight');
  const lastSessionWeight = watch('lastSessionWeight');
  const idwg = watch('idwg');
  const ufTarget = watch('ufTarget');
  const dryWeight = watch('dryWeight');
  const isDisabledInterface = selectIsDisableInterface();
  const patient = selectDialysisPatient();
  const [patientWeights, setPatientWeights] = useState<PatientWeightsResponse>([]);

  const weightOptions = useMemo(() => {
    return patientWeights.length > 0
      ? patientWeights.map((weightOption) => ({
          label: weightOption.weight.toString(),
          value: weightOption.weight.toString(),
          group: t(`form.${weightOption.hdStage}`),
          date: weightOption.weighedAt,
          id: weightOption.id,
        }))
      : [];
  }, [patientWeights]);

  const renderWeightOptionCallback = useCallback((props, option) => {
    return (
      <Stack direction="column" {...props} key={option.id} sx={{ width: 1 }}>
        <Typography variant="labelM" sx={{ width: 1 }}>{`${option.label} ${t('form.kg')}`}</Typography>
        <Typography variant="paragraphS" sx={{ width: 1 }} color={(theme) => theme.palette.text.darker}>{`${dateFormat(
          option.date,
        )} — ${toAmPmTimeString(new Date(option.date))}`}</Typography>
      </Stack>
    );
  }, []);

  useEffect(() => {
    if (patient?.id) {
      API.get<PatientWeightsResponse>(`pm/patients/${patient.id}/weights`)
        .then((res) => setPatientWeights(res.data))
        .catch((error) => {
          console.error(error);
        });
    }
  }, [patient?.id]);

  useEffect(() => {
    const preWeight = parseFloat(preSessionWeight?.value);
    const dWeight = parseFloat(dryWeight);

    if (!isNaN(preWeight) && !isNaN(dWeight)) {
      const value = Math.round(Number((preWeight - dWeight).toFixed(1)) * 100) / 100;
      setValue('weightDifference', `${value}`);
    } else {
      setValue('weightDifference', '');
    }
  }, [preSessionWeight, dryWeight]);

  useEffect(() => {
    const preWeight = parseFloat(preSessionWeight?.value);
    const lastWeight = parseFloat(lastSessionWeight);

    if (!isNaN(preWeight) && !isNaN(lastWeight)) {
      const value = Math.round(Number((preWeight - lastWeight).toFixed(1)) * 100) / 100;
      setValue('idwg', `${value}`);
    } else {
      setValue('idwg', '');
    }
  }, [preSessionWeight, lastSessionWeight]);

  useEffect(() => {
    if (idwg) {
      setValue('ufTarget', `${Number(idwg) * 1000}`);
    }
  }, [idwg]);

  useEffect(() => {
    ufTarget && trigger('ufTarget');
  }, [ufTarget]);

  return (
    <InfoCard title={t('form.weightAndUf')}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={4}>
          <FormAutocompleteFreeSolo
            control={control}
            name="preSessionWeight"
            label={t('form.preWeight')}
            required
            groupBy={(option) => option?.group || ''}
            renderOptionCallback={renderWeightOptionCallback}
            options={weightOptions}
            inputProps={{ inputMode: 'numeric' }}
            isDisabled={isDisabledInterface}
            transform={transformObjectComaToDot}
            rules={{
              required: validatorAutocompleteRequired(),
              pattern: validatorAutocompleteNumberDecimal(),
              minLength: validatorAutocompleteMinLength(2, 5),
              maxLength: validatorAutocompleteMaxLength(2, 5),
              decimalAmount: validatorAutocompleteDecimalAmountIsInRange(
                0,
                1,
                'value',
                tCommon('validation.oneDecimalIsAllowed'),
              ),
            }}
            adornment={t('form.kg')}
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputText
            control={control}
            name="lastSessionWeight"
            required
            label={t('form.lastWeight')}
            isDisabled={isDisabledInterface}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              required: validatorRequired(),
              pattern: validatorNumberDecimal(),
              minLength: validatorMinLength(2, 5),
              maxLength: validatorMaxLength(2, 5),
              validate: {
                decimalAmount: validatorDecimalAmountIsInRange(0, 1, tCommon('validation.oneDecimalIsAllowed')),
              },
            }}
            transform={transformEventCommaToDot}
            adornment={t('form.kg')}
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputText
            control={control}
            name="idwg"
            label={t('form.idwg').toUpperCase()}
            helperText={t('form.interdialyticWeightGain')}
            adornment={t('form.kg')}
            isDisabled
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputText
            required
            control={control}
            name="dryWeight"
            label={t('form.dryWeight')}
            isDisabled={isDisabledInterface}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              required: validatorRequired(),
              pattern: validatorNumberDecimal(),
              minLength: validatorMinLength(2, 5),
              maxLength: validatorMaxLength(2, 5),
              validate: {
                decimalAmount: validatorDecimalAmountIsInRange(0, 1, tCommon('validation.oneDecimalIsAllowed')),
              },
            }}
            transform={transformEventCommaToDot}
            adornment={t('form.kg')}
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputText
            isDisabled
            control={control}
            name="weightDifference"
            label={t('form.weightDifference')}
            adornment={t('form.kg')}
          />
        </Grid>
        <Grid item sm={4} />
        <Grid item xs={4}>
          <FormInputText
            required
            control={control}
            name="reinfusionVolume"
            label={t('form.reinfusionVolume')}
            adornment={t('form.mL')}
            isDisabled={isDisabledInterface}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              required: validatorRequired(),
              pattern: validatorNumberInt(),
              minLength: validatorMinLength(1, 4),
              maxLength: validatorMaxLength(1, 4),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputText
            required
            control={control}
            name="flushesInfusion"
            label={t('form.flushesInfusion')}
            adornment={t('form.mL')}
            isDisabled={isDisabledInterface}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              required: validatorRequired(),
              pattern: validatorNumberInt(),
              minLength: validatorMinLength(1, 4),
              maxLength: validatorMaxLength(1, 4),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputText
            required
            control={control}
            name="ufTarget"
            label={t('form.ufTarget')}
            adornment={t('form.mL')}
            isDisabled={isDisabledInterface}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              required: validatorRequired(),
              pattern: validatorPositiveNegativeNumberInt(),
              minLength: validatorMinLength(1, 5),
              maxLength: validatorMaxLength(1, 5),
              validate: {
                numberPositiveNegative: validatorNumberPositiveNegative,
              },
            }}
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};

export default DialysisPreHdWeightAndUfGroup;
