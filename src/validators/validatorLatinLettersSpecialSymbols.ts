import i18n from 'i18next';
import { latinLettersSpecialSymbolsReg } from '../regexp';

export const validatorLatinLettersSpecialCharacters = () => ({
  value: latinLettersSpecialSymbolsReg,
  message: i18n.t(`common:validation.name`),
});
