import type { Injection } from '@types';
import Typography from '@mui/material/Typography';
import { TodayInjectionsTableInjectionWrapper } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableInjectionWrapper';
import { dotsTextOverflowStyles } from '@utils';
import { Tooltip } from '@mui/material';

type TodayInjectionsTableInjectionsColumnProps = {
  injections: Injection[];
};

export const TodayInjectionsTableInjectionsColumn = ({ injections }: TodayInjectionsTableInjectionsColumnProps) => (
  <>
    {injections.map(({ id, name, dosage }) => (
      <TodayInjectionsTableInjectionWrapper key={`injection-name-${id}`}>
        <Tooltip title={name}>
          <Typography
            data-testid={`injection-name-${id}`}
            variant="paragraphM"
            align="left"
            sx={[dotsTextOverflowStyles]}
          >
            {name}
            {!!dosage && ` ${dosage}`}
          </Typography>
        </Tooltip>
      </TodayInjectionsTableInjectionWrapper>
    ))}
  </>
);
