export const getContainerStyle =
  (shiftCount) =>
  ({ palette }) => ({
    gridArea: 'header',
    display: 'grid',
    gridTemplateColumns: `100px 36px repeat(${shiftCount}, 1fr) 36px`,
    borderTop: `1px solid ${palette.border.default}`,
    borderBottom: `1px solid ${palette.border.default}`,
    position: 'sticky',
    top: '0',
    zIndex: '30',
    backgroundColor: palette.surface.default,
    '& >div:last-child': {
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-1px',
        left: '-1px',
        height: '15px',
        width: '1px',
        borderLeft: `1px solid ${palette.text.secondary}`,
      },
    },
  });
export const getTimeLineCellStyle = ({ palette, typography }) => ({
  pl: 3,
  borderRight: `1px solid ${palette.border.default}`,
  textTransform: 'uppercase',
  fontSize: typography.caption.fontSize,
  fontWeight: typography.fontWeightMedium,
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: palette.surface.default,
});
export const getShiftsCellStyle = (theme) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-1px',
    left: 0,
    height: '15px',
    width: '1px',
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
  },
});
export const getPastFutureCellStyle = () => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});
export const getTimeLabelStyle = () => ({
  position: 'absolute',
  width: 'max-content',
  right: 0,
  transform: 'translate(50%, 0)',
});
export const getShiftNameStyle = ({ palette, spacing }) => ({
  border: `1px solid ${palette.border.default}`,
  padding: spacing(0.25, 0.5),
  borderRadius: '25px',
});
