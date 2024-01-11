import { utcToZonedTime } from 'date-fns-tz';
import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import { getTenantTimeZoneFromStorage } from '@utils/getTenantTimeZoneFromStorage';

export const getTenantDate = (date?: Date | null) => {
  const timeZone = getTenantTimeZoneFromStorage();
  return utcToZonedTime(date ? date : new Date(), timeZone);
};

export const getTenantEndCurrentDay = () => {
  return endOfDay(getTenantDate());
};

export const getTenantStartCurrentDay = () => {
  return startOfDay(getTenantDate());
};

export const getTenantYesterdayDate = (): Date => {
  const timeZone = getTenantTimeZoneFromStorage();
  const tenantCurrentDate = utcToZonedTime(new Date(), timeZone);

  return subDays(tenantCurrentDate, 1);
};

export const getTenantTomorrowDate = (): Date => {
  const timeZone = getTenantTimeZoneFromStorage();
  const tenantCurrentDate = utcToZonedTime(new Date(), timeZone);

  return addDays(tenantCurrentDate, 1);
};
