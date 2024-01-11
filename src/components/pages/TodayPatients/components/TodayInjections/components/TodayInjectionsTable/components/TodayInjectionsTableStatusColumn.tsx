import type { Injection } from '@types';
import { useCallback } from 'react';
import { InjectionStatus } from '@enums';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TodayInjectionsTableInjectionWrapper } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableInjectionWrapper';

type TodayInjectionsTableStatusColumnProps = {
  injections: Injection[];
};

export const TodayInjectionsTableStatusColumn = ({ injections }: TodayInjectionsTableStatusColumnProps) => {
  const getStatusIcon = useCallback((status: InjectionStatus, testId: string) => {
    switch (status) {
      case InjectionStatus.OMITTED:
        return (
          <>
            <CancelIcon data-testid={testId} sx={{ fill: ({ palette }) => palette.error.main }} />
          </>
        );
      case InjectionStatus.PENDING:
        return (
          <>
            <ChangeCircleIcon data-testid={testId} sx={{ fill: '#FFD600' }} />
          </>
        );
      default:
        return (
          <>
            <CheckCircleIcon data-testid={testId} sx={{ fill: '#006D3C' }} />
          </>
        );
    }
  }, []);

  return (
    <>
      {injections.map(({ status, id }) => (
        <TodayInjectionsTableInjectionWrapper key={`injection-status-${id}`}>
          {getStatusIcon(status, `injection-status-${id}`)}
        </TodayInjectionsTableInjectionWrapper>
      ))}
    </>
  );
};
