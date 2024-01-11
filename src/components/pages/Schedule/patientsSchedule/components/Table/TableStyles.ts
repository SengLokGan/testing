export const getTableContainerStyles = (gridTemplateAreasString: string) => () => ({
  gridArea: 'main',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: gridTemplateAreasString,
  position: 'relative',
});
