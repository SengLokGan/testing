import { validatorIsValidDate, validatorFutureDate } from '../validators';
import { validatorNotEarlierThan } from '@validators/validatorNotEarlierThan';

// It checks that value can't be future and can't be earlier than passed date
export const checkIsDataValidToPeriod = (value, notEarlierThanDate) => {
  let validError = validatorIsValidDate(value);
  let cannotBeFutureError = validatorFutureDate()(value);
  let cannotBeLaterThenError = validatorNotEarlierThan(notEarlierThanDate)(value);
  validError = typeof validError === 'string' ? validError : null;
  cannotBeFutureError = typeof cannotBeFutureError === 'string' ? cannotBeFutureError : null;
  cannotBeLaterThenError = typeof cannotBeLaterThenError === 'string' ? cannotBeLaterThenError : null;

  return validError || cannotBeFutureError || cannotBeLaterThenError;
};
