import { isNil, isEmpty, clone, isObjectLike } from 'lodash';

export interface RemoveEmptyFieldsOptions {
  leaveEmptyArrays?: boolean;
  leaveEmptyStrings?: boolean;
  multilineFields?: string[];
}

/** Function removes empty strings, undefined and null fields from the given object, trims strings */
export function clearData<T>(
  data: T,
  options: RemoveEmptyFieldsOptions = {
    leaveEmptyArrays: true,
    leaveEmptyStrings: false,
    multilineFields: [],
  },
): T {
  if (data instanceof FormData) {
    return data;
  }

  const cleanData = clone(data);
  if (isObjectLike(cleanData)) {
    Object.keys(cleanData).forEach((key) => {
      if (typeof cleanData[key] === 'string') {
        // trime and remove extra spaces
        if (!options.multilineFields?.includes(key)) {
          cleanData[key] = cleanData[key].replace(/\s+/g, ' ');
        }
        cleanData[key] = cleanData[key].trim();
        if (!options.leaveEmptyStrings && cleanData[key] === '') {
          delete cleanData[key];
        }
      } else if (isNil(cleanData[key])) {
        delete cleanData[key];
      } else if (Array.isArray(cleanData[key]) && cleanData[key].length === 0) {
        if (!options.leaveEmptyArrays) {
          delete cleanData[key];
        }
      } else if (isObjectLike(cleanData[key]) && isNaN(Date.parse(cleanData[key]))) {
        if (!isEmpty(cleanData[key])) {
          cleanData[key] = clearData(cleanData[key], options);
        }
        if (isEmpty(cleanData[key])) {
          delete cleanData[key];
        }
      }
    });
  }
  return cleanData;
}
