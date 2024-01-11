import { FormAutocompleteOption } from '@components/FormComponents';
type LaboratoriesOptions = FormAutocompleteOption & {
  isDefault: boolean;
};
export declare const useLaboratoryOptionsList: () => {
  laboratoriesOptions: LaboratoriesOptions[];
  getLaboratoryOptions: (id?: number) => Promise<void>;
};
export {};
