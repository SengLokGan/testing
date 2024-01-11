import React, { useEffect, useMemo } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Stack, Typography } from '@mui/material';
import { Option, PreHDForm } from '@types';
import {
  FormInputText,
  InfoCard,
  FormAutocompleteFreeSolo,
  FormInputCheckbox,
  FormAutocomplete,
  FormInputRadio,
} from '@components';
import {
  validatorLatinLettersNumberCharacters,
  validatorMaxLength,
  validatorMaxValue,
  validatorMinLength,
  validatorMinValue,
  validatorNotZero,
  validatorNumberDecimal,
  validatorNumberInt,
  validatorRequired,
  validatorAutocompleteRequired,
  validatorAutocompletePattern,
  validatorAutocompleteMinLength,
  validatorAutocompleteMaxLength,
} from '@validators';
import { Dictionaries, getOptionListFromCatalog, transformEventCommaToDot } from '@utils';
import { DialyzerUseType } from '@enums';
import { selectIsDisableInterface } from '@store/slices/dialysisSlice';
import { selectUser } from '@store/slices';

type DialysisPreHdStepDialyzerGroupProps = {
  control: Control<PreHDForm>;
  watch: UseFormWatch<PreHDForm>;
  setValue: UseFormSetValue<PreHDForm>;
  nursesOptions: Option[];
};

const DialysisPreHdStepDialyzerGroup = ({
  control,
  watch,
  setValue,
  nursesOptions,
}: DialysisPreHdStepDialyzerGroupProps) => {
  const { t } = useTranslation('dialysis');
  const { t: tDialyzerDictionary } = useTranslation(Dictionaries.Dialyzer);
  const user = selectUser();
  const isDisabledInterface = selectIsDisableInterface();
  const newDialyzerField = watch('newDialyzer');
  const sterilantVeField = watch('sterilantVe');
  const residualVeField = watch('residualVe');
  const useType = watch('useType');
  const dialyzerPrimedBy = watch('dialyzerPrimedBy');
  const dialyzerTestedBy = watch('dialyzerTestedBy');
  const residualTestedBy = watch('residualTestedBy');

  useEffect(() => {
    setValue('dialyzerReuseNum', newDialyzerField ? '1' : '');
  }, [newDialyzerField]);

  useEffect(() => {
    if (nursesOptions.length) {
      const userNurses = nursesOptions.find(({ value }) => value === user?.id);
      userNurses && !dialyzerPrimedBy.value && setValue('dialyzerPrimedBy', userNurses);
      userNurses && !dialyzerTestedBy.value && setValue('dialyzerPrimedBy', userNurses);
      userNurses && !residualTestedBy.value && setValue('dialyzerPrimedBy', userNurses);
    }
  }, [dialyzerPrimedBy, dialyzerTestedBy, residualTestedBy, nursesOptions]);

  const dialyzerBrandOptions = useMemo(() => {
    return [
      ...getOptionListFromCatalog(Dictionaries.ReuseDialyzerBrand).map((option) => ({
        ...option,
        group: tDialyzerDictionary(DialyzerUseType.Reuse),
      })),
      ...getOptionListFromCatalog(Dictionaries.SingleDialyzerBrand).map((option) => ({
        ...option,
        group: tDialyzerDictionary(DialyzerUseType.Single),
      })),
    ];
  }, []);

  if (useType === DialyzerUseType.Single) {
    return (
      <InfoCard title={t('form.dialyzer')}>
        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="headerS">{t('form.dialyzerType')}</Typography>
          <FormInputRadio control={control} name="useType" options={getOptionListFromCatalog(Dictionaries.Dialyzer)} />
        </Stack>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={6}>
            <FormAutocompleteFreeSolo
              control={control}
              name="dialyzerBrand"
              label={t('form.dialyzerBrand')}
              required
              groupBy={(option) => option?.group || ''}
              options={dialyzerBrandOptions}
              isDisabled={isDisabledInterface}
              rules={{
                required: validatorAutocompleteRequired(),
                minLength: validatorAutocompleteMinLength(1, 256),
                maxLength: validatorAutocompleteMaxLength(1, 256),
                pattern: validatorAutocompletePattern(validatorLatinLettersNumberCharacters()),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputText
              required
              control={control}
              name="dialyzerSurfaceArea"
              label={t('form.surfaceArea')}
              isDisabled={isDisabledInterface}
              inputProps={{ inputMode: 'numeric' }}
              rules={{
                required: validatorRequired(),
                pattern: validatorNumberDecimal(),
                minLength: validatorMinLength(1, 3),
                maxLength: validatorMaxLength(1, 3),
                validate: {
                  notZero: validatorNotZero,
                },
              }}
              transform={transformEventCommaToDot}
              adornment={t('form.m2')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutocomplete
              required
              control={control}
              name="dialyzerPrimedBy"
              options={nursesOptions}
              label={t('form.primedBy')}
              isDisabled={isDisabledInterface}
              rules={{
                required: validatorAutocompleteRequired(),
              }}
            />
          </Grid>
        </Grid>
      </InfoCard>
    );
  }

  return (
    <InfoCard title={t('form.dialyzer')}>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <Typography variant="headerS">{t('form.dialyzerType')}</Typography>
        <FormInputRadio control={control} name="useType" options={getOptionListFromCatalog(Dictionaries.Dialyzer)} />
      </Stack>
      <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <FormAutocompleteFreeSolo
            control={control}
            name="dialyzerBrand"
            label={t('form.dialyzerBrand')}
            required
            groupBy={(option) => option?.group || ''}
            options={dialyzerBrandOptions}
            isDisabled={isDisabledInterface}
            rules={{
              required: validatorAutocompleteRequired(),
              minLength: validatorAutocompleteMinLength(1, 256),
              maxLength: validatorAutocompleteMaxLength(1, 256),
              pattern: validatorAutocompletePattern(validatorLatinLettersNumberCharacters()),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            required
            control={control}
            name="dialyzerSurfaceArea"
            label={t('form.surfaceArea')}
            isDisabled={isDisabledInterface}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              required: validatorRequired(),
              pattern: validatorNumberDecimal(),
              minLength: validatorMinLength(1, 3),
              maxLength: validatorMaxLength(1, 3),
              validate: {
                notZero: validatorNotZero,
              },
            }}
            transform={transformEventCommaToDot}
            adornment={t('form.m2')}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormInputText
            control={control}
            name="dialyzerReuseNum"
            label={t('form.useNum')}
            isDisabled={isDisabledInterface || newDialyzerField}
            inputProps={{ inputMode: 'numeric' }}
            rules={{
              pattern: validatorNumberInt(),
              minLength: validatorMinLength(1, 5),
              maxLength: validatorMaxLength(1, 5),
              max: validatorMaxValue(1, 100),
              min: validatorMinValue(1, 100),
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormInputCheckbox
            control={control}
            name="newDialyzer"
            label={t('form.newDialyzer')}
            sx={{ mb: 2, mt: 2 }}
            isDisabled={isDisabledInterface}
          />
        </Grid>
      </Grid>
      {!newDialyzerField && (
        <Box>
          <Typography
            variant="headerS"
            sx={{
              mb: 2,
              color: (theme) =>
                sterilantVeField && residualVeField ? theme.palette.text.black : theme.palette.error.main,
            }}
          >
            {t('form.dialyzerSterilant')}
          </Typography>
          <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <FormInputCheckbox
                control={control}
                name="sterilantVe"
                label={t('form.vePlusCanBeUsed')}
                isDisabled={isDisabledInterface}
                required
                rules={{
                  required: validatorRequired(),
                }}
              />
            </Grid>
            {sterilantVeField && (
              <Grid item xs={6}>
                <FormAutocomplete
                  required
                  control={control}
                  name="dialyzerTestedBy"
                  options={nursesOptions}
                  label={t('form.testedBy')}
                  isDisabled={isDisabledInterface}
                  rules={{
                    required: validatorAutocompleteRequired(),
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormInputCheckbox
                control={control}
                name="residualVe"
                label={t('form.veMinusCanBeUsed')}
                isDisabled={isDisabledInterface}
                required
                rules={{
                  required: validatorRequired(),
                }}
              />
            </Grid>
            {residualVeField && (
              <Grid item xs={6}>
                <FormAutocomplete
                  required
                  control={control}
                  name="residualTestedBy"
                  options={nursesOptions}
                  label={t('form.testedBy')}
                  isDisabled={isDisabledInterface}
                  rules={{
                    required: validatorAutocompleteRequired(),
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
      <FormInputText
        control={control}
        name="dialyzerSterilantVeComment"
        label={t('form.comments')}
        isDisabled={isDisabledInterface}
        rules={{
          minLength: validatorMinLength(2, 500),
          maxLength: validatorMaxLength(2, 500),
          pattern: validatorLatinLettersNumberCharacters(),
        }}
        sx={{ mb: 2 }}
      />
      <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <FormAutocomplete
            required
            control={control}
            name="dialyzerPrimedBy"
            options={nursesOptions}
            label={t('form.primedBy')}
            isDisabled={isDisabledInterface}
            rules={{
              required: validatorAutocompleteRequired(),
            }}
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};

export default DialysisPreHdStepDialyzerGroup;
