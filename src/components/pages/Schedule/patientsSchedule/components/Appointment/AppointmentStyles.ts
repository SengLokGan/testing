export const getAppointmentStyles =
  (isIso: boolean, isActive: boolean) =>
  ({ spacing, palette }) => ({
    backgroundColor: isIso ? '#FDCEFD' : palette.primary.light,
    borderRadius: '3px',
    borderLeft: `3px solid ${isIso ? '#B24399' : palette.primary.main}`,
    paddingTop: isActive ? '1px' : `${spacing(0.5)}`,
    paddingBottom: isActive ? '1px' : `${spacing(0.5)}`,
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    height: '100%',
    ...(isActive ? { border: `3px solid ${isIso ? '#B24399' : palette.primary.main}` } : {}),
  });
