import { useEffect, useState } from 'react';
import { DoctorTypes } from '@enums';
import i18n from 'i18next';
import { API, Dictionaries } from '@utils';
import { DoctorRequestType } from '@types';

export const useDoctor = (formData: any, doctorsNameField: any, selectedDoctor?: DoctorRequestType) => {
  const [isExternal, setIsExternal] = useState(false);
  const [specialities, setSpecialities] = useState([]);

  const setSpecialitiesHandler = (data) => {
    setSpecialities(
      data.map((speciality) => ({
        value: speciality.id,
        label: i18n.t(`${Dictionaries.DoctorSpecialities}:${speciality.name}`),
      })),
    );
  };

  useEffect(() => {
    if (specialities.length) {
      setIsExternal(false);
    } else {
      setIsExternal(true);
    }
  }, [specialities]);

  useEffect(() => {
    doctorsNameField?.specialities ? setSpecialitiesHandler(doctorsNameField.specialities) : setSpecialities([]);
  }, [doctorsNameField]);

  useEffect(() => {
    if (formData) {
      if (selectedDoctor) {
        setIsExternal(selectedDoctor.source === DoctorTypes.External);
      }

      if (selectedDoctor && selectedDoctor.source === DoctorTypes.Internal) {
        API.get(`/pm/doctors?name=${selectedDoctor.name}`).then(({ data }) => {
          const mappedData = data.find((doctor) =>
            doctor.specialities.some((speciality) => speciality.id === selectedDoctor.internalDoctorId),
          )?.specialities;
          setSpecialitiesHandler(mappedData || []);
        });
      }
    }
    return () => {
      setSpecialities([]);
    };
  }, [formData]);
  return { isExternalDoctor: isExternal, specialities };
};
