export interface BrowserLocation {
  currentPath: string;
  previousPath: string;
  previousSecondPath: string;
}
export default abstract class HistoryBrowserStorage {
  abstract set(storeData: BrowserLocation): any;
  abstract get(): any;
  abstract clear(): any;
  abstract reset(storePath: string): any;
  abstract update(storePath: string): any;
  abstract fetch(storePath: string): any;
}
