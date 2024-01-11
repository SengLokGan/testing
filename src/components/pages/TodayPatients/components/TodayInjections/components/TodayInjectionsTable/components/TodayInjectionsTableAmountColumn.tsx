import type { Injection } from '@types';
import Typography from '@mui/material/Typography';
import { TodayInjectionsTableInjectionWrapper } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableInjectionWrapper';

type TodayInjectionsTableAmountColumnProps = {
  injections: Injection[];
};

export const TodayInjectionsTableAmountColumn = ({ injections }: TodayInjectionsTableAmountColumnProps) => (
  <>
    {injections.map(({ id, amount }) => (
      <TodayInjectionsTableInjectionWrapper key={`injection-amount-${id}`} sx={{ justifyContent: 'flex-end' }}>
        <Typography data-testid={`injection-amount-${id}`} variant="paragraphM" align="right">
          {amount}
        </Typography>
      </TodayInjectionsTableInjectionWrapper>
    ))}
  </>
);
