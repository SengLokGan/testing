import { useEffect } from 'react';
import { HospitalizationReportsTable } from '@components/pages/Reports';
import { useAppDispatch } from '@hooks/storeHooks';
import { clearHospitalizationReports } from '@store/slices';

export const HospitalizationReports = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearHospitalizationReports());
    };
  }, []);

  return <HospitalizationReportsTable />;
};
