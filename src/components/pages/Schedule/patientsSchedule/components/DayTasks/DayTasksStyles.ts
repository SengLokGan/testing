export const getDayTasksRowStyles = ({ palette }) => ({
  display: 'grid',
  gridArea: 'day_tasks',
  gridTemplateColumns: '100px 36px 1fr 36px',
  borderBottom: `1px solid ${palette.border.default}`,
});

export const getSlotsStyles = ({ palette, typography }) => ({
  pl: 3,
  borderRight: `1px solid ${palette.border.default}`,
  textTransform: 'uppercase',
  fontSize: typography.caption.fontSize,
  fontWeight: typography.fontWeightMedium,
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  left: 0,
  zIndex: 25,
  backgroundColor: palette.surface.default,
});

export const getDayTaskCellStyle = () => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
});
