import { capitalize } from '@mui/material';
import { getDeletedSyfix } from '@utils/getDoctorName';

interface PersonInfo {
  name?: string;
  deleted?: boolean;
}

export const getPersonNameWithDeletedSyfix = (personInfo?: PersonInfo, shouldCapitalize = true) => {
  const formattedName = shouldCapitalize ? capitalize(personInfo?.name || '') : personInfo?.name;

  return formattedName ? `${formattedName}${getDeletedSyfix(personInfo || {})}` : '';
};
