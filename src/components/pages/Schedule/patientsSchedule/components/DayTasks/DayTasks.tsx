import { MouseEvent, useState } from 'react';
import { parse } from 'date-fns';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover, { PopoverPosition } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { getDayTaskCellStyle, getDayTasksRowStyles, getSlotsStyles } from './DayTasksStyles';
import { TimeLine } from '../TimeLine/TimeLine';
import { selectDayTasks, selectShifts } from '@store/slices';
import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import { getEventTypeColor } from '@components/pages/Schedule/clinicalSchedule/utils/getEventTypeColor';
import { getEventTypeLabel } from '@components/pages/Schedule/clinicalSchedule/components/EventsList/EventsList';
import { getTenantDate } from '@utils/getTenantDate';
import { QuarterlyBloodTestCard } from '@components/pages/Schedule/clinicalSchedule/components/QuarterlyBloodTestCard/QuarterlyBloodTestCard';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AddHocEventTypes, ClinicalEvent, IndividualLabTestPlanEvent } from '@types';
import { IndividualLabTestCard } from '../IndividualLabTestCard/IndividualLabTestCard';

const POPUP_WIDTH = 276;

export const DayTasks = () => {
  const [anchorPosition, setAnchorPosition] = useState<PopoverPosition | undefined>(undefined);
  const [activeEvent, setActiveEvent] = useState<ClinicalEvent | IndividualLabTestPlanEvent | null>(null);

  const { t } = useTranslation('schedule');
  const dayTasks = selectDayTasks();
  const shifts = selectShifts();

  const getEventTitle = (dayTask: ClinicalEvent | IndividualLabTestPlanEvent) => {
    switch (dayTask.type) {
      case ClinicalScheduleEventType.QuarterlyBloodTest:
        return t('events.QUARTERLY_BLOOD_TEST');
      case AddHocEventTypes.LAB_TEST:
        return dayTask.patientName;
      default:
        return '';
    }
  };

  const getTaskPosition = ({ isAllDay, startTime, endTime }) => {
    if (isAllDay) {
      return {
        left: 0,
        width: '100%',
      };
    } else {
      const startShiftTimeStamp = parse(shifts[0].timeStart, 'HH:mm:ss', getTenantDate()).getTime();
      const endShiftTimeStamp = parse(shifts[shifts.length - 1].timeEnd, 'HH:mm:ss', getTenantDate()).getTime();
      const onePercent = (endShiftTimeStamp - startShiftTimeStamp) / 100;

      const startTaskTimeStamp = parse(startTime, 'HH:mm:ss', getTenantDate()).getTime();
      const endTaskTimeStamp = parse(endTime, 'HH:mm:ss', getTenantDate()).getTime();

      const taskStartPosition = (startTaskTimeStamp - startShiftTimeStamp) / onePercent;
      const taskWidth = (endTaskTimeStamp - startTaskTimeStamp) / onePercent;

      return {
        left: `${taskStartPosition}%`,
        width: `${taskWidth}%`,
      };
    }
  };

  const onEventClick = (event: MouseEvent, dayTask: ClinicalEvent) => {
    setAnchorPosition({ left: event.clientX, top: event.clientY });
    setActiveEvent(dayTask);
  };

  const handlePopoverClose = () => {
    setAnchorPosition(undefined);
    setActiveEvent(null);
  };

  const getPopoverContent = () => {
    switch (activeEvent?.type) {
      case AddHocEventTypes.LAB_TEST:
        return <IndividualLabTestCard event={activeEvent} onClose={handlePopoverClose} />;
      case ClinicalScheduleEventType.QuarterlyBloodTest:
        return <QuarterlyBloodTestCard event={activeEvent} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Popover
        anchorReference="anchorPosition"
        open={Boolean(anchorPosition)}
        anchorPosition={anchorPosition}
        onClose={handlePopoverClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            transform: 'translate(0px, 8px) !important',
          },
        }}
      >
        <Box sx={{ p: 2, width: `${POPUP_WIDTH - 16}px` }}>
          <Stack justifyContent="end" direction="row">
            <IconButton
              onClick={handlePopoverClose}
              sx={{
                m: 0,
                p: 0,
                '&:hover': { backgroundColor: 'unset' },
              }}
              data-testid="closeModalButton"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          {getPopoverContent()}
        </Box>
      </Popover>
      <Box sx={getDayTasksRowStyles} data-testid="dayTasksRow">
        <Box sx={getSlotsStyles}>{t('dayTasks')}</Box>
        <Box></Box>
        <Box sx={getDayTaskCellStyle}>
          {dayTasks &&
            dayTasks.map((dayTask) => (
              <Stack
                key={dayTask.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={({ spacing, palette }) => ({
                  backgroundColor: palette.primary.light,
                  borderRadius: '4px',
                  borderLeft: `3px solid ${palette.primary.main}`,
                  height: '24px',
                  paddingLeft: spacing(1),
                  paddingRight: spacing(1),
                  position: 'relative',
                  cursor: 'pointer',
                  marginTop: spacing(0.25),
                  ...getTaskPosition(dayTask),
                })}
                onClick={(event) => onEventClick(event, dayTask)}
                data-testid="dayTask"
              >
                <Typography
                  variant="labelS"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {getEventTitle(dayTask)}
                </Typography>
                <Box
                  sx={({ spacing, palette, typography }) => ({
                    minWidth: '16px',
                    height: '16px',
                    lineHeight: typography.paragraphXS.lineHeight,
                    borderRadius: '8px',
                    backgroundColor: getEventTypeColor(dayTask.type),
                    color: palette.text.white,
                    fontSize: typography.paragraphXS.fontSize,
                    fontWeight: typography.labelL.fontWeight,
                    paddingLeft: spacing(0.5),
                    paddingRight: spacing(0.5),
                  })}
                >
                  {getEventTypeLabel(dayTask.type)}
                </Box>
              </Stack>
            ))}
          <TimeLine />
        </Box>
        <Box></Box>
      </Box>
    </>
  );
};
