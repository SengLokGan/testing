import { getStorageInitData } from '@utils/storageInitData';

export const getTenantTimeZoneFromStorage = () => {
  const initData = getStorageInitData();
  return initData?.timeZone ? initData?.timeZone : 'Asia/Singapore';
};
