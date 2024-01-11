import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormInputRadio, FormInputSelect, FormInputText, FormTimePicker } from '@components/FormComponents';
import { FormAutocompleteAsync } from '@components/FormComponents/FormAutocompleteAsync';
import { validatorAutocompleteRequired } from '@validators/autocomplete/validatorAutocompleteRequired';
import { FormAutocomplete } from '@components/FormComponents/FormAutocomplete';
import { validatorAutocompletePattern } from '@validators/autocomplete/validatorAutocompletePattern';
import { validatorLatinLettersNumberCharacters } from '@validators/validatorLatinLettersNumbersCharacters';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import type { LabOrderLaboratory, PerformLabTestForm } from '@types';
import { API } from '@utils/api';
import { AutocompleteFreeSoloOptionType } from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';
import { getOption } from '@src/utils/getOption';
import Grid from '@mui/material/Grid';
import { LabMealStatus } from '@src/enums';
import { capitalizeFirstLetter, Dictionaries, getOptionListFromCatalog, getTenantDate } from '@src/utils';
import { validatorRequired } from '@validators/validatorRequired';
import { validatorFutureTime } from '@validators/validatorFutureTime';
import { validatorIsValidDate } from '@validators/validatorIsValidDate';
import Typography from '@mui/material/Typography';
import { validatorMinLength } from '@validators/validatorMinLength';
import { validatorMaxLength } from '@validators/validatorMaxLength';

type PerformLabTestFormViewProps = {
  control: Control<PerformLabTestForm>;
  setValue: UseFormSetValue<PerformLabTestForm>;
  watch: UseFormWatch<PerformLabTestForm>;
  nursesOptions: { label: string; value: string }[];
  isDirty?: boolean;
  procedureOptions: AutocompleteFreeSoloOptionType[];
};
export const PerformLabTestFormView = ({
  control,
  watch,
  setValue,
  isDirty,
  procedureOptions,
  nursesOptions,
}: PerformLabTestFormViewProps) => {
  const { t: tLabs } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const [laboratories, setLaboratories] = useState<LabOrderLaboratory[]>([]);
  const labControllerRef = useRef<AbortController | null>();
  const selectedProcedure = watch('procedure');

  const resetLaboratories = () => {
    setLaboratories([]);
    setValue('laboratory', getOption('', ''));
  };
  const updateLaboratories = async (id: number) => {
    if (labControllerRef) labControllerRef.current?.abort();
    labControllerRef.current = new AbortController();
    try {
      const response: any = await API.get('/pm/labs', {
        params: { procedureIds: id },
        signal: labControllerRef?.current?.signal,
      });

      setLaboratories(response.data);

      const defaultLaboratory = response.data.find((laboratory) => laboratory.isDefault);
      if (defaultLaboratory) {
        setValue('laboratory', getOption(defaultLaboratory.name, defaultLaboratory.id));
      }
    } catch (error) {
      resetLaboratories();
    }
  };

  useEffect(() => {
    if (selectedProcedure?.value && !isNaN(Number(selectedProcedure?.value))) {
      if (isDirty) resetLaboratories();
      updateLaboratories(Number((selectedProcedure as AutocompleteFreeSoloOptionType).value));
    } else {
      resetLaboratories();
    }
  }, [selectedProcedure]);

  const mealStatusOptions = useMemo(
    () => [
      { label: capitalizeFirstLetter(tLabs('forms.creation.unknown')), value: LabMealStatus.UNKNOWN },
      { label: capitalizeFirstLetter(tLabs('forms.creation.fasting')), value: LabMealStatus.FASTING },
      { label: capitalizeFirstLetter(tLabs('forms.creation.nonFasting')), value: LabMealStatus.NON_FASTING },
    ],
    [],
  );

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid item xs={6}>
        <FormAutocompleteAsync
          required
          fullWidth
          name="patient"
          control={control}
          label={tLabs('forms.creation.patientName')}
          getOptionsUrl="/pm/patients/names?name="
          optionsTransform={(options) => options.map((option) => ({ value: option.id, label: option.name }))}
          isDisabled
          rules={{
            required: validatorAutocompleteRequired(),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormAutocomplete
          required
          control={control}
          name="procedure"
          label={tLabs('forms.creation.procedure')}
          options={procedureOptions}
          isDisabled
          groupBy={(option) => option.group || ''}
          rules={{
            required: validatorAutocompleteRequired(),
            pattern: validatorAutocompletePattern(validatorLatinLettersNumberCharacters()),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormAutocomplete
          required
          name="laboratory"
          control={control}
          label={tLabs('forms.creation.labName')}
          options={laboratories.map(({ id, name }) => ({ label: name, value: id }))}
          isDisabled
          rules={{
            required: validatorAutocompleteRequired(),
            pattern: validatorAutocompletePattern(validatorLatinLettersNumberCharacters()),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormInputSelect
          required
          control={control}
          isDisabled
          name="specimenType"
          label={tLabs('forms.creation.specimenType')}
          options={getOptionListFromCatalog(Dictionaries.LabOrdersSpecimenTypes)}
          rules={{
            required: validatorRequired(),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormTimePicker
          required
          control={control}
          name="performedAt"
          maxTime={getTenantDate()}
          label={tLabs('forms.perform.performedTime')}
          rules={{
            required: validatorRequired(),
            validate: {
              maxDate: validatorFutureTime(getTenantDate(), tCommon('validation.timeShouldNotBeMoreThanTheCurrentOne')),
              validDate: validatorIsValidDate,
            },
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormAutocomplete
          required
          control={control}
          name="performedBy"
          options={nursesOptions}
          label={tLabs('forms.perform.performedBy')}
          rules={{
            required: validatorAutocompleteRequired(),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="labelMCapsSB" sx={(theme) => ({ color: theme.palette.text.secondary })} mb={1}>
          {tLabs('forms.creation.mealStatus')}
        </Typography>
        <FormInputRadio control={control} name="mealStatus" options={mealStatusOptions} orientation="row" />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          control={control}
          name="comments"
          label={tLabs('forms.perform.comments')}
          multiline
          rules={{
            minLength: validatorMinLength(2, 500),
            maxLength: validatorMaxLength(2, 500),
            pattern: validatorLatinLettersNumberCharacters(),
          }}
        />
      </Grid>
    </Grid>
  );
};
