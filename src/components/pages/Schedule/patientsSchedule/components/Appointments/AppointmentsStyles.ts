export const getCellStyles = (areaKey) => () => ({
  display: 'grid',
  gridArea: areaKey,
  gridTemplateColumns: '1fr',
  paddingTop: '1px',
  paddingRight: '1px',
});
