import { Doctor } from '@types';
import i18n from 'i18next';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';

export const getDeletedSyfix = (user: { deleted?: boolean; [key: string]: any }) => {
  const deletedMessage = ` (${i18n.t('common:deleted')})`;
  return `${user?.deleted ? deletedMessage : ''}`;
};

export const getDoctorName = (doctor: Doctor) => {
  if (doctor?.name && doctor?.speciality) {
    return `${doctor.name}${getDeletedSyfix(doctor)}, ${getCodeValueFromCatalog(
      'doctorSpecialities',
      doctor.speciality,
    )}`;
  }
  if (doctor?.name && !doctor?.speciality) {
    return `${doctor.name}${getDeletedSyfix(doctor)}`;
  }
  if (doctor?.speciality) {
    return `${getCodeValueFromCatalog('doctorSpecialities', doctor.speciality)}${getDeletedSyfix(doctor)}`;
  }
  return '—';
};
