import { MortalityReportsTable } from '@components/pages/Reports';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks/storeHooks';
import { clearMortalityReports } from '@src/store';

export const MortalityReports = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMortalityReports());
    };
  }, []);

  return <MortalityReportsTable />;
};
