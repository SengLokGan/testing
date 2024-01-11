export declare const dateFormat: (dateString?: string | Date, expectedFormat?: string) => string;
export declare const to12HourFormat: (date?: Date) => {
  hours: number;
  minutes: number;
  meridian: string;
};
export declare const toAmPmTimeString: (date: Date) => string;
export declare const getPassedTimeLabel: (dateString: string) => string;
export declare const dateToServerFormat: (date: Date) => string;
export declare const dateTimeToServerFormat: (date: Date) => string;
