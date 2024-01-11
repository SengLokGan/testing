type Accuracy = 'y' | 'm' | 'd';
export declare const getTimeFromDate: (
  date: string | undefined,
  accuracy?: Accuracy,
  withStartDate?: boolean,
) => string | null;
export declare const getHoursAndMinutes: (value?: number, delimiter?: string) => string | undefined;
export {};
