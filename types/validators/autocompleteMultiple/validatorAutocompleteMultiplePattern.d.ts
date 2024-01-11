interface Pattern {
  value: string | RegExp;
  message: string;
}
export declare const validatorAutocompleteMultiplePattern: (pattern: Pattern) => (data: any) => string | true;
export {};
