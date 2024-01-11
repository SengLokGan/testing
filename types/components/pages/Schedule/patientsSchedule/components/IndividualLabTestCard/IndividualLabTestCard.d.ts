/// <reference types="react" />
import { IndividualLabTestPlanEvent } from '@types';
type IndividualLabTestServicesProps = {
  onClose: () => void;
  event: IndividualLabTestPlanEvent;
};
export declare const IndividualLabTestCard: ({ onClose, event }: IndividualLabTestServicesProps) => JSX.Element;
export {};
