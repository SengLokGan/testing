import { Column } from '@types';
import { CellType } from '@enums';

export const collapseColumn: Column = {
  id: 'collapse',
  label: '',
  maxWidth: 80,
  minWidth: 80,
  width: 80,
  align: 'left',
  cellType: CellType.CollapseControl,
  dotsTextOverflow: false,
};
