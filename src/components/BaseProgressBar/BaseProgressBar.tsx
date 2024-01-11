import { useTranslation } from 'react-i18next';
import type { WithSx } from '@types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { convertSxToArray } from '@utils/converters/mui';

type BaseProgressBarProps = WithSx<{
  current: number;
  label: string;
  finished?: boolean;
}>;

export const BaseProgressBar = ({ current, label, finished = false, sx = [] }: BaseProgressBarProps) => {
  const { t } = useTranslation('dialysis');
  const iconStyles = (theme) => ({
    color: theme.palette.primary.dark,
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  });

  return (
    <Box
      data-testid="BaseProgressBar"
      sx={[
        (theme) => ({
          width: 1,
          backgroundColor: theme.palette.border.default,
          position: 'relative',
          height: theme.spacing(2.5),
          borderRadius: theme.spacing(12.5),
          overflow: 'hidden',
        }),
        ...convertSxToArray(sx),
      ]}
    >
      <Box
        data-testid="BaseProgressBarLine"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: current > 100 ? 1 : `${current}%`,
          backgroundColor: current >= 100 ? '#83FAAE' : '#F7E468',
          height: 1,
          borderRadius: (theme) => theme.spacing(12.5),
        }}
      />
      <Box sx={{ position: 'absolute' }}>
        {finished ? (
          <StopCircleIcon data-testid="BaseProgressBarProgressDoneIcon" sx={(theme) => iconStyles(theme)} />
        ) : (
          <PlayCircleIcon data-testid="BaseProgressBarInProgressIcon" sx={(theme) => iconStyles(theme)} />
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          backgroundColor: 'transparent',
          height: 1,
          zIndex: 2,
        }}
      >
        <Stack direction="row" justifyContent="center">
          <Typography variant="labelM">{finished ? t('finished') : label}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
