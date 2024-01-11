import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { FormInputSelect, FormInputText, FormPhoneInput, FormNumberInput } from '@components';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Dictionaries, getOptionListFromCatalog } from '@utils';
import { useFieldArray } from 'react-hook-form';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { latinLettersSpecialCharactersReg, latinLettersSpecialSymbolsReg } from '@src/regexp';
import { InputTextType } from '@enums';
import { MALAYSIA_PHONE_CODE } from '@src/constants';

/*
 * TODO: fix type
 * type FamilyInformationProps = {
 *    control: Control<RegisterPatientForm | FamilyForm>;
 *    watch: UseFormWatch<RegisterPatientForm | FamilyForm>;
 *    register: UseFormRegister<RegisterPatientForm | FamilyForm>;
 * }
 */

type FamilyInformationProps = {
  control: any;
  watch: any;
  register: any;
};

export const MAX_KIN_COUNT = 5;

export const FamilyInformation = ({ control, watch, register }: FamilyInformationProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'kins',
  });

  const watchFieldArray = watch('kins');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...(watchFieldArray?.[index] && watchFieldArray[index]),
    };
  });

  return (
    <Stack spacing={3} direction="column" sx={[isXs && { mt: (theme) => `${theme.spacing(2)} !important` }]}>
      <Box>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={3}
          sx={(theme) => ({
            mb: theme.spacing(3),
          })}
        >
          <Grid item xs={12} sm={6}>
            <FormInputSelect
              options={getOptionListFromCatalog(Dictionaries.MaritalStatuses)}
              control={control}
              name="maritalStatus"
              label={t('modal.maritalStatus')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormNumberInput
              label={t('modal.numberOfChildren')}
              name="childCount"
              control={control}
              rules={{
                max: { value: 25, message: tCommon('validation.maxNumber', { min: 0, max: 25 }) },
              }}
            />
          </Grid>
        </Grid>

        <Stack spacing={3} direction="column">
          {controlledFields.map((field, index) => {
            return (
              <Stack spacing={3} direction="column" key={field.id}>
                <Stack spacing={1.5} direction="row">
                  <Typography variant="headerS">{`${t('profile.nextOfKin')} ${index + 1}`}</Typography>
                  {index > 0 && (
                    <DeleteOutlinedIcon
                      onClick={() => remove(index)}
                      sx={(theme) => ({ cursor: 'pointer', color: theme.palette.icon.main })}
                    />
                  )}
                </Stack>
                <Grid item xs={12} sm={6}>
                  <FormInputText
                    control={control}
                    name={`kins.${index}.name`}
                    label={t('modal.kinName')}
                    textType={InputTextType.Capitalize}
                    required
                    rules={{
                      required: { value: true, message: tCommon('validation.required') },
                      minLength: { value: 1, message: tCommon('validation.length', { min: 1, max: 256 }) },
                      maxLength: { value: 256, message: tCommon('validation.length', { min: 1, max: 256 }) },
                      pattern: { value: latinLettersSpecialSymbolsReg, message: tCommon('validation.name') },
                    }}
                    sx={(theme) => ({ maxWidth: { sm: '100%', md: theme.spacing(42) } })}
                  />
                </Grid>
                <Box>
                  <Grid container rowSpacing={3} columnSpacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormInputText
                        control={control}
                        name={`kins.${index}.relationship`}
                        label={t('modal.relationship')}
                        rules={{
                          pattern: {
                            value: latinLettersSpecialCharactersReg,
                            message: tCommon('validation.textField'),
                          },
                          minLength: { value: 3, message: tCommon('validation.length', { min: 3, max: 25 }) },
                          maxLength: { value: 25, message: tCommon('validation.length', { min: 3, max: 25 }) },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormPhoneInput
                        name={`kins.${index}.phone.number`}
                        codeName={`kins.${index}.phone.countryCode`}
                        phoneCode={field.phone.countryCode}
                        control={control}
                        register={register}
                        rules={{
                          required: { value: true, message: tCommon('validation.required') },
                          minLength: { value: 6, message: tCommon('validation.length', { min: 6, max: 14 }) },
                          maxLength: { value: 14, message: tCommon('validation.length', { min: 6, max: 14 }) },
                        }}
                        sx={(theme) => ({
                          width: 1,
                          maxWidth: { xs: '100%', sm: `${theme.spacing(42.5)} !important` },
                        })}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <Grid item xs={12} sm={6}>
        <Button
          onClick={() =>
            append({ name: '', relationship: '', phone: { number: '', countryCode: MALAYSIA_PHONE_CODE } })
          }
          variant={'outlined'}
          sx={[{ textTransform: 'unset' }]}
          disabled={fields.length === MAX_KIN_COUNT}
          data-testid="addKinButton"
        >
          <Box sx={(theme) => ({ fontSize: theme.typography.headerM.fontSize })}>+</Box>&nbsp;{t('button.addKin')}
        </Button>
      </Grid>
    </Stack>
  );
};
