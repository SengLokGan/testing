export declare const getContainerStyle: (shiftCount: any) => ({ palette }: { palette: any }) => {
  gridArea: string;
  display: string;
  gridTemplateColumns: string;
  borderTop: string;
  borderBottom: string;
  position: string;
  top: string;
  zIndex: string;
  backgroundColor: any;
  '& >div:last-child': {
    '&::before': {
      content: string;
      position: string;
      bottom: string;
      left: string;
      height: string;
      width: string;
      borderLeft: string;
    };
  };
};
export declare const getTimeLineCellStyle: ({ palette, typography }: { palette: any; typography: any }) => {
  pl: number;
  borderRight: string;
  textTransform: string;
  fontSize: any;
  fontWeight: any;
  display: string;
  alignItems: string;
  position: string;
  left: number;
  right: number;
  zIndex: number;
  backgroundColor: any;
};
export declare const getShiftsCellStyle: (theme: any) => {
  position: string;
  display: string;
  justifyContent: string;
  alignItems: string;
  '&::before': {
    content: string;
    position: string;
    bottom: string;
    left: number;
    height: string;
    width: string;
    borderLeft: string;
  };
};
export declare const getPastFutureCellStyle: () => {
  position: string;
  display: string;
  alignItems: string;
};
export declare const getTimeLabelStyle: () => {
  position: string;
  width: string;
  right: number;
  transform: string;
};
export declare const getShiftNameStyle: ({ palette, spacing }: { palette: any; spacing: any }) => {
  border: string;
  padding: any;
  borderRadius: string;
};
