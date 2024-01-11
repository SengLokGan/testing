export declare const getTimeLineWrapperStyles: (shiftCount: any) => ({ palette }: { palette: any }) => {
  display: string;
  gridTemplateColumns: string;
  position: string;
  top: string;
  bottom: string;
  left: string;
  right: string;
  pointerEvents: string;
  '&::after': {
    content: string;
    position: string;
    top: number;
    bottom: number;
    right: number;
    borderRight: string;
  };
};
export declare const getShiftColumnStyles: ({ palette }: { palette: any }) => {
  borderLeft: string;
};
export declare const getTimeLineStyles: (position: any) => {
  width: string;
  backgroundColor: string;
  position: string;
  left: string;
  top: number;
  bottom: number;
  zIndex: number;
  transition: string;
  '&::before': {
    content: string;
    position: string;
    top: number;
    left: string;
    width: string;
    height: string;
    borderTop: string;
    borderLeft: string;
    borderRight: string;
  };
};
