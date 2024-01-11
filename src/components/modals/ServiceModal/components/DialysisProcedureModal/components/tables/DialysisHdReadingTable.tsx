import { useEffect, useMemo } from 'react';
import {
  addHighlightToRows,
  selectDialysisBay,
  selectDialysisHdReadingRecords,
  selectDialysisLoading,
  selectHdReadingRecordsHighlightList,
  selectIsDisableInterface,
} from '@store/slices/dialysisSlice';
import { RichTable } from '@components/RichTable/RichTable';
import { getDialysisHdReadingTableColumns, ROWS_HIGHLIGHT_TIME_DELAY } from '@constants';
import { RowHighlightType } from '@enums/components';
import { useAppDispatch } from '@hooks/storeHooks';

const DialysisHdReadingTable = () => {
  const dialysisHdReadingTableColumns = useMemo(getDialysisHdReadingTableColumns, []);
  const dispatch = useAppDispatch();
  const isDisableInterface = selectIsDisableInterface();
  const records = selectDialysisHdReadingRecords();
  const rowsForHighlight = selectHdReadingRecordsHighlightList();
  const isLoading = selectDialysisLoading();
  const bay = selectDialysisBay();
  const newRows = rowsForHighlight?.map((row) => (row.type === RowHighlightType.SuccessfullyAdded ? row.id : null));

  const modifiedDialysisHdReadingTableColumns = useMemo(() => {
    if (isDisableInterface) {
      const actionsColumn = dialysisHdReadingTableColumns.find((column) => column.id === 'id');
      if (actionsColumn) actionsColumn.format = () => undefined;
    }
    return dialysisHdReadingTableColumns;
  }, [dialysisHdReadingTableColumns]);

  useEffect(() => {
    if (rowsForHighlight?.length === 0) return;
    document.querySelector('.MuiModal-root .MuiTableRow-root')?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
    const timeout = setTimeout(() => {
      dispatch(addHighlightToRows({ rows: [] }));
    }, ROWS_HIGHLIGHT_TIME_DELAY);
    return () => clearTimeout(timeout);
  }, [records]);

  if (!records || !records.length) return null;

  return (
    <>
      <RichTable
        data-testid="DialysisHdReadingTable"
        columns={modifiedDialysisHdReadingTableColumns}
        rows={records.map((record) => ({ ...record, bay }))}
        rowExtraProps={[
          {
            condition: (data) => {
              return newRows?.includes(data.id);
            },
            props: { sx: { '& > td': { backgroundColor: '#E9F0F6' } } },
          },
          {
            condition: (data) => Boolean(data['__STATUS__']),
            props: {
              'data-testid': 'richTableOfflineRow',
              sx: { backgroundColor: (theme) => theme.palette.error.light, color: (theme) => theme.palette.error.main },
            },
          },
        ]}
        isDataLoading={isLoading}
      />
    </>
  );
};

export default DialysisHdReadingTable;
