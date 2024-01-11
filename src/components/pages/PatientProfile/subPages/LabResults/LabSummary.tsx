import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { LabResultsViewTable } from '@components/laboratories/components/tables/LabResultsViewTable';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  getLabResultsList,
  selectLabResultsIsLoading,
  selectLabResultsList,
  selectLabResultsSpecifications,
  exportLabResult,
} from '@store';
import { Column } from '@types';
import { Dictionaries, convertLabResultsToTableFormat } from '@utils';
import { Event } from '@services/Event/Event';
import { EventsName } from '@enums/global/EventsName';

interface TableConfig {
  columns: Column[];
  preColumns: Column[];
  nextColumns: Column[];
  data: any[];
}

export const LabSummary = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const labResultsList = selectLabResultsList();
  const specifications = selectLabResultsSpecifications();
  const isLoading = selectLabResultsIsLoading();
  const { t: tLabResultsMeasurements } = useTranslation(Dictionaries.LabResultsMeasurements);
  const { t: tLabResultsTestSetName } = useTranslation(Dictionaries.LabResultsTestSetName);
  const { t: tLabResultsTestValue } = useTranslation(Dictionaries.LabResultsTestValues);

  useEffect(() => {
    const exportLabResultHandler = (orderNumber) => dispatch(exportLabResult(orderNumber));

    Event.subscribe(EventsName.ExportLabResult, exportLabResultHandler);
    return () => {
      Event.unsubscribe(EventsName.ExportLabResult, exportLabResultHandler);
    };
  }, []);

  const [tableConfig, setTableConfig] = useState<TableConfig>({
    columns: [],
    preColumns: [],
    nextColumns: [],
    data: [],
  });

  useEffect(() => {
    id && dispatch(getLabResultsList(id));
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      setTableConfig(
        convertLabResultsToTableFormat(labResultsList, specifications, {
          tLabResultsMeasurements,
          tLabResultsTestSetName,
          tLabResultsTestValue,
        }),
      );
    }
  }, [isLoading, labResultsList, specifications]);

  return <LabResultsViewTable isLoading={isLoading} {...tableConfig} />;
};
