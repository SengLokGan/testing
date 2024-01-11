import { AxiosInstance } from 'axios';
export declare const API: AxiosInstance;
export declare const setHeaders: (
  headers: {
    [key: string]: string;
  },
  axiosInstance?: AxiosInstance,
) => void;
export declare const deleteHeaders: (headerKeys: string[], axiosInstance?: AxiosInstance) => void;
/** Reading localstorage data and adding common headers on axios initialization */
export declare function setInitialHeaders(): Record<string, string>;
