export interface RemoveEmptyFieldsOptions {
  leaveEmptyArrays?: boolean;
  leaveEmptyStrings?: boolean;
  multilineFields?: string[];
}
/** Function removes empty strings, undefined and null fields from the given object, trims strings */
export declare function clearData<T>(data: T, options?: RemoveEmptyFieldsOptions): T;
