import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';
import i18n from 'i18next';

export const dateFormat = (dateString?: string | Date, expectedFormat = 'dd/MM/yyyy'): string => {
  if (!dateString) {
    return '';
  }
  return format(new Date(dateString), expectedFormat);
};

export const to12HourFormat = (date = new Date()): { hours: number; minutes: number; meridian: string } => {
  return {
    hours: ((date.getHours() + 11) % 12) + 1,
    minutes: date.getMinutes(),
    meridian: date.getHours() >= 12 ? 'PM' : 'AM',
  };
};

export const toAmPmTimeString = (date: Date) => {
  let hours = date.getHours();
  let minutes: string = date.getMinutes().toString();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;
  hours = Number(hours) < 10 ? (`0${hours}` as any) : hours;
  minutes = Number(minutes) < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

export const getPassedTimeLabel = (dateString: string): string => {
  const date = new Date(dateString);
  const dateNow = new Date();
  if (differenceInMinutes(dateNow, date) <= 60) {
    return i18n.t('notifications:minutesAgo', { minutes: Math.abs(differenceInMinutes(dateNow, date)) });
  }
  if (differenceInHours(dateNow, date) <= 24) {
    return i18n.t('notifications:hoursAgo', { hours: Math.abs(differenceInHours(date, dateNow)) });
  }
  if (differenceInHours(dateNow, date) <= 48) {
    return i18n.t('notifications:daysAgo', { days: Math.abs(differenceInDays(date, dateNow)) });
  }
  return format(date, 'dd.MM.yyyy');
};

export const dateToServerFormat = (date: Date) => format(date, 'yyyy-MM-dd');

export const dateTimeToServerFormat = (date: Date) => date.toISOString(); //'2023-01-12T07:50:14.261Z'
