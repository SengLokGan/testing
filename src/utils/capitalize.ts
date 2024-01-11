export const capitalize = (value: string) => {
  return value
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const capitalizeFirstLetter = (text = '') => (text ? `${text[0].toUpperCase()}${text.slice(1)}` : text);
