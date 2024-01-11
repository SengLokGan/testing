import { API } from '@utils/api';
import { useEffect, useState } from 'react';
import { selectUser } from '@store/slices';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';

export const useGetNursesOptions = (
  setValue?: UseFormSetValue<any>,
  optionValue = false,
  fieldName = 'administeredBy',
) => {
  const user = selectUser();
  const [nursesOptions, setNursesOptions] = useState<{ label: string; value: string }[]>([]);
  const [userNurse, setUserNurse] = useState<{ name: string; id: number; userId: number } | null>(null);
  const getNursesList = async () => {
    API.get('/pm/nurses')
      .then(({ data }) => data.filter((user) => !user.deleted))
      .then((data) => {
        if (user?.id) {
          const userNurses = data.find(({ userId }) => userId === user?.id);
          setUserNurse(userNurses);
          setNursesOptions(data.map((option) => ({ label: option.name, value: option.id })));
          if (userNurses && setValue) {
            optionValue
              ? setValue(fieldName, {
                  label: userNurses.name,
                  value: userNurses.id,
                })
              : setValue(fieldName, userNurses.id);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getNursesList();
  }, [setValue]);

  return { nursesOptions, userNurse };
};
