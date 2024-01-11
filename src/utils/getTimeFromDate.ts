import { format, intervalToDuration } from 'date-fns';
import i18n from 'i18next';

type Accuracy = 'y' | 'm' | 'd';

export const getTimeFromDate = (
  date: string | undefined,
  accuracy?: Accuracy,
  withStartDate: boolean = true,
): string | null => {
  const y = i18n.t(`common:y`);
  const m = i18n.t(`common:m`);
  const d = i18n.t(`common:d`);

  if (!date?.length) {
    return null;
  }

  const formattedDate = format(new Date(date), 'dd/MM/yyyy');
  const { years, months, days } = intervalToDuration({ start: new Date(date), end: new Date() });
  if (accuracy && accuracy === 'y') return withStartDate ? `${formattedDate} (${years}${y})` : `${years}${y}`;
  if (accuracy && accuracy === 'm')
    return withStartDate ? `${formattedDate} (${years}${y} ${months}${m})` : `${years}${y} ${months}${m}`;
  if (accuracy && accuracy === 'd')
    return withStartDate
      ? `${formattedDate} (${years}${y} ${months}${m} ${days}${d})`
      : `${years}${y} ${months}${m} ${days}${d}`;
  return formattedDate;
};

export const getHoursAndMinutes = (value?: number, delimiter = ' ') => {
  if (value !== 0 && !value) return undefined;
  const hours = value / 60;
  const roundedHours = Math.floor(hours);
  const minutes = (hours - roundedHours) * 60;
  const roundedMinutes = Math.round(minutes);
  const formattedHours = hours < 10 ? `0${roundedHours}` : roundedHours;
  const formattedMinutes = roundedMinutes < 10 ? `0${roundedMinutes}` : roundedMinutes;
  return `${formattedHours}h${delimiter}${formattedMinutes}m`;
};
