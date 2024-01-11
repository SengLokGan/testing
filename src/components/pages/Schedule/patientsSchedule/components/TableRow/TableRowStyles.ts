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

export const getRowStyles =
  ({ isIsoGroup, isoKey, slotKey, shiftCount, templateArea }) =>
  ({ palette }) => ({
    display: 'grid',
    gridArea: isIsoGroup ? `${isoKey}_${slotKey}` : slotKey,
    gridTemplateColumns: `100px 36px repeat(${shiftCount}, 1fr) 36px`,
    borderBottom: `1px solid ${palette.border.default}`,
    minHeight: '32px',
    gridTemplateAreas: templateArea,
  });
