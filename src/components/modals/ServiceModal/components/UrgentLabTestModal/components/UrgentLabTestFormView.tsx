import { useEffect } from 'react';
import { FormInputSelect } from '@components/FormComponents';
import { FormAutocompleteAsync } from '@components/FormComponents/FormAutocompleteAsync';
import { validatorAutocompleteRequired } from '@validators/autocomplete/validatorAutocompleteRequired';
import { FormAutocomplete } from '@components/FormComponents/FormAutocomplete';
import { validatorAutocompletePattern } from '@validators/autocomplete/validatorAutocompletePattern';
import { validatorLatinLettersNumberCharacters } from '@validators/validatorLatinLettersNumbersCharacters';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { Dictionaries, getOptionListFromCatalog } from '@utils/getOptionsListFormCatalog';
import type { UrgentLabTestForm } from '@types';
import { getOption } from '@src/utils/getOption';
import Grid from '@mui/material/Grid';
import { validatorRequired } from '@validators/validatorRequired';
import { useProceduresOptionsList } from '@hooks/useProceduresOptionsList';
import { useLaboratoryOptionsList } from '@hooks/useLaboratoryOptionsList';

type UrgentLabTestFormViewProps = {
  control: Control<UrgentLabTestForm>;
  setValue: UseFormSetValue<UrgentLabTestForm>;
  watch: UseFormWatch<UrgentLabTestForm>;
  patientDisabled?: boolean;
};

export const UrgentLabTestFormView = ({ control, watch, setValue, patientDisabled }: UrgentLabTestFormViewProps) => {
  const { procedureOptions } = useProceduresOptionsList();
  const { laboratoriesOptions, getLaboratoryOptions } = useLaboratoryOptionsList();
  const { t: tLabs } = useTranslation('labOrders');

  const procedure = watch('procedure');
  const laboratory = watch('laboratory');

  const resetLaboratories = () => {
    getLaboratoryOptions();
    setValue('laboratory', getOption('', ''));
  };

  useEffect(() => {
    if (procedure?.value) {
      if (laboratory) resetLaboratories();
      getLaboratoryOptions(Number(procedure.value));
    } else {
      resetLaboratories();
    }
  }, [procedure]);

  useEffect(() => {
    const defaultLaboratory = laboratoriesOptions.find((laboratory) => laboratory.isDefault);
    if (defaultLaboratory) {
      setValue('laboratory', getOption(defaultLaboratory.label, `${defaultLaboratory.value}`));
    }
  }, [laboratoriesOptions]);

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
          isDisabled={patientDisabled}
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
          isDisabled={!procedureOptions.length}
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
          options={laboratoriesOptions}
          isDisabled={!procedure?.value || !laboratoriesOptions.length}
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
          name="specimenType"
          label={tLabs('forms.creation.specimenType')}
          options={getOptionListFromCatalog(Dictionaries.LabOrdersSpecimenTypes)}
          rules={{
            required: validatorRequired(),
          }}
        />
      </Grid>
    </Grid>
  );
};
