export const getTimeLineWrapperStyles =
  (shiftCount) =>
  ({ palette }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${shiftCount}, 1fr)`,
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '136px',
    right: '36px',
    pointerEvents: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      borderRight: `1px solid ${palette.text.secondary}`,
    },
  });

export const getShiftColumnStyles = ({ palette }) => ({
  borderLeft: `1px solid ${palette.text.secondary}`,
});

export const getTimeLineStyles = (position) => ({
  width: '1px',
  backgroundColor: '#B12648',
  position: 'absolute',
  left: `${position}%`,
  top: 0,
  bottom: 0,
  zIndex: 20,
  transition: 'left 0.5s',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-8px',
    width: '17px',
    height: '0px',
    borderTop: '16px solid #B12648',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
  },
});
