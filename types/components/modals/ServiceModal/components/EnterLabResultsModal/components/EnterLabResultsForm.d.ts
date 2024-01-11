/// <reference types="react" />
import { LabResultFieldsResponse, ManualEnterLabResultFileType, ManualEnterLabResultTestSetItem } from '@types';
type EnterLabResultsFormProps = {
  dynamicFieldsData: LabResultFieldsResponse[];
  testSets: ManualEnterLabResultTestSetItem[];
  labResultFile: ManualEnterLabResultFileType[];
  onCancel: () => void;
};
export declare const EnterLabResultsForm: ({
  dynamicFieldsData,
  testSets,
  labResultFile,
  onCancel,
}: EnterLabResultsFormProps) => JSX.Element;
export {};
