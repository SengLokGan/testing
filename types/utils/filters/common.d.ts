type combineFiltersList = ((value: any) => boolean)[];
export declare const combineFilters: (...filters: combineFiltersList) => (value: any) => boolean;
export {};
