import { IDBPDatabase } from 'idb';
import {
  IndexedDbConfig,
  IndexedDbStoreConfig,
  IndexedDbStoreIndex,
  IndexedDbStoreIndexConfig,
  WithOnlineStatus,
} from '@types';
import IndexedDbStorageAbstract from './abstract/IndexedDbStorage';
export declare enum IndexedDbStorageTransactionEnum {
  READ_WRITE = 'readwrite',
  READ_ONLY = 'readonly',
  VERSION_CHANGE = 'versionchange',
}
export declare class IndexedDbStore {
  name: string;
  indexes: IndexedDbStoreIndex[];
  config: IndexedDbStoreConfig;
  constructor(name: string, indexes: IndexedDbStoreIndex[], config: IndexedDbStoreConfig);
}
export declare class IndexedDbIndex {
  name: string;
  keyPath?: string | undefined;
  config?: IndexedDbStoreIndexConfig | undefined;
  constructor(name: string, keyPath?: string | undefined, config?: IndexedDbStoreIndexConfig | undefined);
}
export declare class IndexedDbStorage<Item> extends IndexedDbStorageAbstract<WithOnlineStatus<Item>> {
  private transaction?;
  private activeStore?;
  private stack;
  private filters;
  config: IndexedDbConfig;
  database: IDBPDatabase;
  constructor(config: IndexedDbConfig);
  static cleanAllDatabasesByNamePattern(namePattern: RegExp): Promise<void>;
  private getStatus;
  private getActiveStore;
  private isInTransaction;
  private addToStack;
  openDb(): Promise<void>;
  startTransaction(
    storeName: string,
    mode?: IndexedDbStorageTransactionEnum,
    config?: {
      [key: string]: unknown;
    },
  ): IndexedDbStorage<Item>;
  endTransaction(): Promise<any>;
  getAllKeys(): IndexedDbStorage<Item>;
  add(data: Item, key?: string): IndexedDbStorage<Item>;
  read(key: string | number): IndexedDbStorage<Item>;
  readAll(): IndexedDbStorage<Item>;
  update(keys: any, data: any): IndexedDbStorage<Item>;
  delete(key: string | number): IndexedDbStorage<Item>;
  deleteAll(): IndexedDbStorage<Item>;
  addFilter(filterCallback: (data: any) => boolean): IndexedDbStorage<Item>;
  filterOffline(): IndexedDbStorage<Item>;
  deleteDB(): Promise<void>;
}
