import { useEffect, useState } from 'react';
import { API } from '@utils/api';

export const useShiftOptionsList = () => {
  const [shiftOptions, setShiftOptions] = useState([]);

  useEffect(() => {
    API.get('/pm/shifts')
      .then(({ data }) => {
        setShiftOptions(data.map((item) => ({ value: item.id, label: item.name })));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { shiftOptions };
};
