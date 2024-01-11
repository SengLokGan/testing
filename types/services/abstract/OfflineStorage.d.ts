export declare enum OfflineStorageStatusEnum {
  ONLINE = 0,
  OFFLINE = 1,
}
export default abstract class OfflineStorage<Item> {
  abstract add(data: Item): any;
  abstract getAllKeys(): any;
  abstract read(key: string | number): any;
  abstract readAll(): any;
  abstract delete(key: string | number): any;
  abstract deleteAll(): any;
  abstract update(keys: string[], data: Partial<Item>): any;
  abstract addFilter(filterCallback: (data: Item) => boolean): any;
  abstract startTransaction(storeName: string): any;
  abstract endTransaction(): any;
  abstract deleteDB(): any;
}
