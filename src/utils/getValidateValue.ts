import { format } from 'date-fns';

export const validateDataValue = (value?: any, defaultValue?: any) => {
  return value || defaultValue;
};

export const validateDateValue = (value?: string | number | Date, defaultValue?: null, formats?: any) => {
  return value ? format(new Date(value), formats) : defaultValue;
};
