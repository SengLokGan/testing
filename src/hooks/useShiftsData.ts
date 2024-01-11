import { useEffect, useState } from 'react';
import { API } from '@utils';
import type { AxiosResponse } from 'axios';
import type { ShiftSchedulerData } from '@types';
import { DaysOfWeek } from '@enums';
import { format, isValid } from 'date-fns';

export const useShiftsData = (isolationGroupId: number | string, startDate: Date | string | null) => {
  const [shiftsData, setShiftsData] = useState<ShiftSchedulerData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    API.post('/pm/prescriptions/recurrent/available', {
      isolationGroupId,
      startDate: startDate && isValid(startDate) ? format(new Date(startDate), 'yyyy-MM-dd') : null,
    })
      .then(({ data }: AxiosResponse<ShiftSchedulerData>) => {
        setShiftsData(
          data.map((shift) => ({
            ...shift,
            dayCountResponse: shift.dayCountResponse.map((day) => ({
              ...day,
              day: day.day.toUpperCase() as DaysOfWeek,
            })),
          })),
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isolationGroupId, startDate]);

  return { shiftsData, isLoading };
};
