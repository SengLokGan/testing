import type { UseFormSetError } from 'react-hook-form/dist/types/form';
interface DoctorStatusInfo {
  deleted?: boolean;
  [key: string]: any;
}
export declare function useDeletedUserValidation(
  field: string,
  setError: UseFormSetError<any>,
  doctor: DoctorStatusInfo,
): void;
export {};
