import type { DialysisProcessInfoForProgress } from '@types';
import { DialysisProgressInfoBlockVariants, DialysisStatus } from '@enums';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableVariantDialysisInfoBlock } from './components/TableVariantDialysisInfoBlock';
import { StandardDialysisInfoBlock } from './components/StandardDialysisInfoBlock';
import { WithSx } from '@types';
import Box from '@mui/material/Box';
import { MINUTE } from '@constants';

type DialysisProgressInfoBlockProps = WithSx<{
  variant: DialysisProgressInfoBlockVariants;
  dialysisProcessInfo: DialysisProcessInfoForProgress;
  checkInfoHandler?: () => void;
  withAddInfoIcon?: boolean;
}>;

export const DialysisProgressInfoBlock = ({
  variant,
  dialysisProcessInfo,
  checkInfoHandler = () => {},
  withAddInfoIcon = false,
  sx,
}: DialysisProgressInfoBlockProps) => {
  const { t } = useTranslation('dialysis');
  const [now, setNow] = useState<number>(0);
  const [percentages, setPercentages] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const dialysisInProgress = dialysisProcessInfo?.status === DialysisStatus.HDReading;

  const calculateTime = (end: number): void => {
    const diffsMs = end - now;
    const numberToString = (result: number): string => {
      if (result <= 0) return '00';
      if (result < 10) return `0${result}`;
      return result.toString();
    };
    const calculateHours = () => {
      const result = Math.floor((diffsMs / (1000 * 60 * 60)) % 24);
      return numberToString(result);
    };
    const calculateMinutes = () => {
      const result = Math.floor((diffsMs / 1000 / 60) % 60);
      return numberToString(result);
    };
    const hours = calculateHours();
    const minutes = calculateMinutes();

    setProgressLabel(`- ${hours}h ${minutes}m`);
  };

  const calculatePercentage = (start: number, end: number): void => {
    const percentage = Math.floor(((now - start) / (end - start)) * 100);

    setPercentages(percentage);
  };

  useEffect(() => {
    let intervalId;
    if (dialysisInProgress && percentages >= 0 && percentages < 100) {
      intervalId = setInterval(() => {
        setNow(Date.now());
      }, MINUTE);
    } else {
      intervalId && clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [percentages, dialysisInProgress]);

  useEffect(() => {
    setNow(Date.now());
    if (dialysisProcessInfo && dialysisProcessInfo.status === DialysisStatus.PostDialysis) {
      setProgressLabel(t('progress.finished'));
      setPercentages(100);
    }
  }, [dialysisProcessInfo]);

  useEffect(() => {
    if (dialysisProcessInfo) {
      if (dialysisInProgress && dialysisProcessInfo.startTime && dialysisProcessInfo.endTime) {
        const parsedStartTime = new Date(dialysisProcessInfo.startTime).getTime();
        const parsedEndTime = new Date(dialysisProcessInfo.endTime).getTime();

        calculateTime(parsedEndTime);
        if (percentages < 100) {
          calculatePercentage(parsedStartTime, parsedEndTime);
        }
      }
    }
  }, [now, dialysisProcessInfo, percentages]);

  switch (variant) {
    case DialysisProgressInfoBlockVariants.Standard:
      return (
        <Box sx={sx} data-testid="StandardDialysisInfoBlock">
          <StandardDialysisInfoBlock
            withInfoIcon={withAddInfoIcon}
            checkInfoHandler={checkInfoHandler}
            progressInPercents={percentages}
            progressLabel={progressLabel}
            dialysisProcessInfo={dialysisProcessInfo}
          />
        </Box>
      );
    case DialysisProgressInfoBlockVariants.Table:
      return (
        <Box sx={sx} data-testid="TableVariantDialysisInfoBlock">
          <TableVariantDialysisInfoBlock
            progressInPercents={percentages}
            progressLabel={progressLabel}
            dialysisProcessInfo={dialysisProcessInfo}
            checkInfoHandler={checkInfoHandler}
          />
        </Box>
      );
    default:
      return null;
  }
};
