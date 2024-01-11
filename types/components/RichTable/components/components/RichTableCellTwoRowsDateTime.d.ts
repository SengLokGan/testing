/// <reference types="react" />
interface RichTableCellTwoRowsDateTimeProps {
  data: {
    date: Date | string;
    isEdited?: boolean;
  };
}
declare const RichTableCellTwoRowsDateTime: ({
  data: { date, isEdited },
}: RichTableCellTwoRowsDateTimeProps) => JSX.Element;
export default RichTableCellTwoRowsDateTime;
