export const getIsoHeaderRowStyles =
  (isoName) =>
  ({ palette }) => ({
    display: 'grid',
    gridArea: isoName,
    gridTemplateColumns: '100px',
    gridTemplateRows: '52px',
    borderBottom: `1px solid ${palette.border.default}`,
    backgroundColor: palette.background.default,
  });

export const getIsoNameCellStyles = ({ palette, typography }) => ({
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
});
