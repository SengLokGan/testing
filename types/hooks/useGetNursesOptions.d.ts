import { UseFormSetValue } from 'react-hook-form/dist/types/form';
export declare const useGetNursesOptions: (
  setValue?: UseFormSetValue<any>,
  optionValue?: boolean,
  fieldName?: string,
) => {
  nursesOptions: {
    label: string;
    value: string;
  }[];
  userNurse: {
    name: string;
    id: number;
    userId: number;
  } | null;
};
