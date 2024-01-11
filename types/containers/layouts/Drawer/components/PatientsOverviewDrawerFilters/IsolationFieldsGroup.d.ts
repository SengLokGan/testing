import { Dispatch, SetStateAction } from 'react';
import { PatientIsolationFilterItem } from '@types';
type IsolationFieldsGroupProps = {
  isolationFilters: {
    items: PatientIsolationFilterItem[];
  };
  setIsolationFiltersLocalState: Dispatch<
    SetStateAction<{
      items: PatientIsolationFilterItem[];
    }>
  >;
  isolationFiltersLocalState: {
    items: PatientIsolationFilterItem[];
  };
};
declare const IsolationFieldsGroup: ({
  isolationFilters,
  setIsolationFiltersLocalState,
  isolationFiltersLocalState,
}: IsolationFieldsGroupProps) => JSX.Element;
export default IsolationFieldsGroup;
