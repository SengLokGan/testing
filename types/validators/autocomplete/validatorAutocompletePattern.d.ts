interface Pattern {
  value: string | RegExp;
  message: string;
}
export declare const validatorAutocompletePattern: (pattern: Pattern, field?: string) => (data: any) => string | true;
export {};
