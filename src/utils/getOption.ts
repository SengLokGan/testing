export const getOption = (label?: string, value?: string) => {
  if (label && value) return { label, value };
  if (label && !value) return { label, value: label };
  return null;
};
