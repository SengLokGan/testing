import uniqId from 'uniqid';
import { Column } from '@types';
import { CellType } from '@enums';

export const getEmptyColumn = (extra: Partial<Column> | undefined = {}): Column => ({
  id: uniqId(),
  label: '',
  cellType: CellType.Empty,
  ...extra,
});
