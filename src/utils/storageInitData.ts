import type { InitData } from '@types';

export const setStorageInitData = (initData: InitData) => {
  localStorage.setItem('initData', JSON.stringify(initData));
};

export const getStorageInitData = (): InitData | null => {
  try {
    const initData = localStorage.getItem('initData');
    return initData && JSON.parse(initData);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const clearStorageInitData = () => {
  localStorage.removeItem('initData');
};
