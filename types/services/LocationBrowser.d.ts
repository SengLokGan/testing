import LocationBrowserStorageAbstract, { BrowserLocation } from './abstract/HistoryBrowserStorage';
export declare const historyBrowserData: () => LocationBrowserStorage<unknown>;
export declare class LocationBrowserStorage<Item> extends LocationBrowserStorageAbstract {
  constructor();
  currentPath: string;
  previousPath: string;
  set(storeData: BrowserLocation): LocationBrowserStorage<Item>;
  get(): LocationBrowserStorage<Item>;
  reset(storePath: string): LocationBrowserStorage<Item>;
  update(storePath: string): LocationBrowserStorage<Item>;
  fetch(storePath: string): LocationBrowserStorage<Item>;
  clear(): LocationBrowserStorage<Item>;
}
