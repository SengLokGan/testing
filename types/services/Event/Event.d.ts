declare class Observer {
  observers: {
    [key: string]: Array<(any: any) => void>;
  };
  constructor();
  subscribe(type: any, fn: any): void;
  unsubscribe(type: any, fn: any): void;
  fire(type: any, data?: any): void;
}
export declare const Event: Observer;
export {};
