/// <reference types="react" />
interface HdPrescriptionDataRowProps {
  title: string;
  value?: string | number;
  additionalValue?: string | number;
}
declare const HdPrescriptionDataRow: ({ title, value, additionalValue }: HdPrescriptionDataRowProps) => JSX.Element;
export default HdPrescriptionDataRow;
