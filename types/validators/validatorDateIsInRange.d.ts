interface ValidatorDateIsInRangeProps {
  dateFrom: Date;
  dateTo: Date;
  errorMessage?: string;
  convertToTenantDate?: boolean;
}
export declare const validatorDateIsInRange: ({
  dateFrom,
  dateTo,
  errorMessage,
  convertToTenantDate,
}: ValidatorDateIsInRangeProps) => (value: any) => string | true | undefined;
export {};
