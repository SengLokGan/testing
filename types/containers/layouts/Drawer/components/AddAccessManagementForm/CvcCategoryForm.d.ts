/// <reference types="react" />
import { Control } from 'react-hook-form/dist/types/form';
import { CVCAccessManagementForm } from '@types';
type CvcCategoryFormProps = {
  control: Control<CVCAccessManagementForm>;
  defaultInstillation: string;
};
export declare const CvcCategoryForm: ({ defaultInstillation, control }: CvcCategoryFormProps) => JSX.Element;
export {};
