import { useEffect } from 'react';
import type { UseFormSetError } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';

interface DoctorStatusInfo {
  deleted?: boolean;
  [key: string]: any;
}

export function useDeletedUserValidation(field: string, setError: UseFormSetError<any>, doctor: DoctorStatusInfo) {
  const { t: tValidation } = useTranslation('common', { keyPrefix: 'validation' });

  useEffect(() => {
    if (doctor?.deleted) {
      setError(field, { type: 'custom', message: tValidation('deletedUserCantBeSelected') });
    }
  }, [doctor]);
}
