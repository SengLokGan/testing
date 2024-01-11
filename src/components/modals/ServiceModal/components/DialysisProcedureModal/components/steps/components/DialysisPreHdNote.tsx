import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form/dist/types/form';
import { FormInputText, InfoCard } from '@components';
import { validatorLatinLettersNumberCharacters, validatorMaxLength, validatorMinLength } from '@validators';
import { PreHDForm } from '@types';
import { selectIsDisableInterface } from '@store/slices/dialysisSlice';

type DialysisPreHdNoteProps = {
  control: Control<PreHDForm>;
};

export const DialysisPreHdNote = ({ control }: DialysisPreHdNoteProps) => {
  const { t } = useTranslation('dialysis');
  const isDisabledInterface = selectIsDisableInterface();

  return (
    <InfoCard title={t('form.preHdNotes')}>
      <FormInputText
        control={control}
        name="notes"
        label={t('form.enterNote')}
        multiline
        isDisabled={isDisabledInterface}
        rules={{
          pattern: validatorLatinLettersNumberCharacters(),
          minLength: validatorMinLength(2, 500),
          maxLength: validatorMaxLength(2, 500),
        }}
      />
    </InfoCard>
  );
};
