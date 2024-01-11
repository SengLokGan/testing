import { ReactElement } from 'react';
export declare const getAppointmentStatusIcon: (status: any) => ReactElement;
export declare const SERVICES_CARD_WIDTH = 260;
export declare const getPopoverPosition: (
  anchorEl: any,
  popupWidth?: number,
) => {
  readonly anchorOrigin: {
    readonly vertical: 'top';
    readonly horizontal: 'left' | 'right';
  };
  readonly transformOrigin: {
    readonly horizontal: 'left' | 'right';
    readonly vertical: 'top';
  };
};
export declare const getPopoverStyle: (
  anchorEl: any,
  popupWidth?: number,
) => {
  '& .MuiPaper-root': {
    borderRadius: string;
    transform: string;
  };
};
