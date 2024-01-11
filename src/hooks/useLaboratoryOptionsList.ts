import { useRef, useState } from 'react';
import { API } from '@utils';
import { FormAutocompleteOption } from '@components/FormComponents';

type LaboratoriesOptions = FormAutocompleteOption & { isDefault: boolean };
export const useLaboratoryOptionsList = () => {
  const [laboratoriesOptions, setLaboratoriesOptions] = useState<LaboratoriesOptions[]>([]);
  const labControllerRef = useRef<AbortController | null>();

  const getLaboratoryOptions = async (id?: number) => {
    if (id) {
      if (labControllerRef) labControllerRef.current?.abort();
      labControllerRef.current = new AbortController();
      try {
        const response: any = await API.get('/pm/labs', {
          params: { procedureIds: id },
          signal: labControllerRef?.current?.signal,
        });
        setLaboratoriesOptions(response.data.map(({ id, name, isDefault }) => ({ label: name, value: id, isDefault })));
      } catch (error) {
        setLaboratoriesOptions([]);
      }
    } else {
      setLaboratoriesOptions([]);
    }
  };

  return { laboratoriesOptions, getLaboratoryOptions };
};
