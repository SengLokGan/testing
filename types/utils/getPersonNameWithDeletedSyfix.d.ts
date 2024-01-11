interface PersonInfo {
  name?: string;
  deleted?: boolean;
}
export declare const getPersonNameWithDeletedSyfix: (personInfo?: PersonInfo, shouldCapitalize?: boolean) => string;
export {};
