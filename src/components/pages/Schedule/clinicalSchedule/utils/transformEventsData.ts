import { ClinicalEvent } from '@types';
import { getMonth } from 'date-fns';
import { Month } from '@constants/global/month';

export const transformEventsData = (events: ClinicalEvent[]): { [key: number]: { [key: string]: ClinicalEvent[] } } => {
  return events.reduce(
    (acc, event) => {
      const monthIndex = getMonth(new Date(event.date));
      if (acc[monthIndex][event.date]) {
        return {
          ...acc,
          [monthIndex]: {
            ...acc[monthIndex],
            [event.date]: [...acc[monthIndex][event.date], event],
          },
        };
      } else {
        return {
          ...acc,
          [monthIndex]: {
            ...acc[monthIndex],
            [event.date]: [event],
          },
        };
      }
    },
    {
      [Month.January]: {},
      [Month.February]: {},
      [Month.March]: {},
      [Month.April]: {},
      [Month.May]: {},
      [Month.June]: {},
      [Month.July]: {},
      [Month.August]: {},
      [Month.September]: {},
      [Month.October]: {},
      [Month.November]: {},
      [Month.December]: {},
    },
  );
};
