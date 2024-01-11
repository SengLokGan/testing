import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FormInputText, FormInputSelect } from '@components';
import { InputTextType } from '@enums';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { Dictionaries, getOptionListFromCatalog } from '@utils';
import { latinLettersNumbersCharactersReg, numbersReg } from '@src/regexp';

/* TODO: fix type
 *  type AddressProps = {
 *    control: Control<RegisterPatientForm | MainInfoForm>;
 * };
 */

type AddressProps = {
  control: any;
};

export const Address = ({ control }: AddressProps) => {
  const { t } = useTranslation('patient');
  const { t: tCommon } = useTranslation('common');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Stack spacing={2} direction="column" sx={[isXs && { mt: (theme) => `${theme.spacing(2)} !important` }]}>
      <Typography variant="headerM">{t('modal.address')}</Typography>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              name="houseFlat"
              label={t('modal.flat')}
              required
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                pattern: { value: latinLettersNumbersCharactersReg, message: tCommon('validation.textField') },
                minLength: { value: 1, message: tCommon('validation.length', { min: 1, max: 100 }) },
                maxLength: { value: 100, message: tCommon('validation.length', { min: 1, max: 100 }) },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              name="street"
              label={t('modal.street')}
              required
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                pattern: { value: latinLettersNumbersCharactersReg, message: tCommon('validation.textField') },
                minLength: { value: 3, message: tCommon('validation.length', { min: 3, max: 100 }) },
                maxLength: { value: 100, message: tCommon('validation.length', { min: 3, max: 100 }) },
              }}
              textType={InputTextType.Capitalize}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              name="city"
              label={t('modal.city')}
              required
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                pattern: { value: latinLettersNumbersCharactersReg, message: tCommon('validation.textField') },
                minLength: { value: 3, message: tCommon('validation.length', { min: 3, max: 100 }) },
                maxLength: { value: 100, message: tCommon('validation.length', { min: 3, max: 100 }) },
              }}
              textType={InputTextType.Capitalize}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormInputText
              control={control}
              name="district"
              label={t('modal.district')}
              rules={{
                pattern: { value: latinLettersNumbersCharactersReg, message: tCommon('validation.textField') },
                minLength: { value: 3, message: tCommon('validation.length', { min: 3, max: 100 }) },
                maxLength: { value: 100, message: tCommon('validation.length', { min: 3, max: 100 }) },
              }}
              textType={InputTextType.Capitalize}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              name="state"
              label={t('modal.state')}
              rules={{
                pattern: { value: latinLettersNumbersCharactersReg, message: tCommon('validation.textField') },
                minLength: { value: 3, message: tCommon('validation.length', { min: 3, max: 100 }) },
                maxLength: { value: 100, message: tCommon('validation.length', { min: 3, max: 100 }) },
              }}
              textType={InputTextType.Capitalize}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputSelect
              options={getOptionListFromCatalog(Dictionaries.Countries)}
              control={control}
              name="countryIso"
              required
              label={t('modal.country')}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              name="postalCode"
              required
              label={t('modal.zip')}
              inputProps={{ inputMode: 'numeric' }}
              rules={{
                required: { value: true, message: tCommon('validation.required') },
                minLength: { value: 2, message: tCommon('validation.length', { min: 2, max: 25 }) },
                maxLength: { value: 25, message: tCommon('validation.length', { min: 2, max: 25 }) },
                pattern: { value: numbersReg, message: tCommon('validation.numbersField') },
              }}
              textType={InputTextType.Capitalize}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
