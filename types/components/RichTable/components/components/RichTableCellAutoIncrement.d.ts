/// <reference types="react" />
interface RichTableCellAutoIncrementProps {
  rowIndex: number;
  pagination?: {
    currentPage: number;
    perPage: number;
  };
}
declare const RichTableCellAutoIncrement: ({ rowIndex, pagination }: RichTableCellAutoIncrementProps) => JSX.Element;
export default RichTableCellAutoIncrement;
