/// <reference types="react" />
interface RichTableCellCheckboxProps {
  checked: boolean;
  onRowSelect?: () => void;
  data: any;
  fullData: any;
}
declare const RichTableCellCheckbox: ({
  checked,
  onRowSelect,
  data,
  fullData,
}: RichTableCellCheckboxProps) => JSX.Element;
export default RichTableCellCheckbox;
