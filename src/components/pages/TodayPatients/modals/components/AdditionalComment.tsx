import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FormInputText } from '@components';
import { useTranslation } from 'react-i18next';
import { latinLettersNumbersCharactersReg } from '@src/regexp';

/* TODO: fix type
 * type AdditionalCommentsProps = {
 *    control: Control<RegisterPatientForm | MainInfoForm>;
 * };
 */

type AdditionalCommentsProps = {
  control: any;
};

export const AdditionalComments = ({ control }: AdditionalCommentsProps) => {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('patient');
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box sx={[isXs && { mt: (theme) => `${theme.spacing(2)} !important` }]}>
      <Typography variant="headerM" sx={{ mb: 3 }}>
        {t('modal.additionalComments')}
      </Typography>
      <FormInputText
        control={control}
        name="comment"
        hiddenLabel
        multiline
        rules={{
          maxLength: { value: 500, message: tCommon('validation.maxLength', { max: 500 }) },
          pattern: { value: latinLettersNumbersCharactersReg, message: tCommon('validation.latinLetters') },
        }}
      />
    </Box>
  );
};
