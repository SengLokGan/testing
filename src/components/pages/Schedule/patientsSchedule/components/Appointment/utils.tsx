import { ReactElement } from 'react';
import { OneDayCalendarAppointmentStatus } from '@enums/components';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export const getAppointmentStatusIcon = (status): ReactElement => {
  switch (status) {
    case OneDayCalendarAppointmentStatus.CHECK_IN:
      return <WatchLaterIcon fontSize="small" />;
    case OneDayCalendarAppointmentStatus.PRE_DIALYSIS:
    case OneDayCalendarAppointmentStatus.SERVICE_ENCOUNTERED:
      return <ChangeCircleIcon fontSize="small" />;
    case OneDayCalendarAppointmentStatus.HD_READING:
      return <PlayCircleIcon sx={{ color: '#1D1D00' }} fontSize="small" />;
    case OneDayCalendarAppointmentStatus.POST_DIALYSIS:
      return <StopCircleIcon sx={{ color: '#1D1D00' }} fontSize="small" />;
    case OneDayCalendarAppointmentStatus.COMPLETED:
      return <CheckCircleIcon fontSize="small" />;
    default:
      return <WatchLaterIcon fontSize="small" />;
  }
};

export const SERVICES_CARD_WIDTH = 260;
export const getPopoverPosition = (anchorEl, popupWidth = SERVICES_CARD_WIDTH) => {
  let rightWidth = popupWidth;
  if (anchorEl) {
    rightWidth = document.documentElement.clientWidth - anchorEl.getBoundingClientRect().right;
  }

  return {
    anchorOrigin: {
      vertical: 'top',
      horizontal: rightWidth >= SERVICES_CARD_WIDTH ? 'right' : 'left',
    },
    transformOrigin: {
      horizontal: rightWidth >= SERVICES_CARD_WIDTH ? 'left' : 'right',
      vertical: 'top',
    },
  } as const;
};

export const getPopoverStyle = (anchorEl, popupWidth = SERVICES_CARD_WIDTH) => {
  let rightWidth = popupWidth;

  if (anchorEl) {
    rightWidth = document.documentElement.clientWidth - anchorEl.getBoundingClientRect().right;
  }

  return {
    '& .MuiPaper-root': {
      borderRadius: '16px',
      transform: `translate(${rightWidth >= popupWidth ? 20 : -24}px, -4px) !important`,
    },
  };
};
