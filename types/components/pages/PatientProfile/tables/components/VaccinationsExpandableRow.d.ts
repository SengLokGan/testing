/// <reference types="react" />
import type { VaccinationResponse } from '@types';
export type VaccinationsExpandableRowProps = VaccinationResponse;
export declare const VaccinationsExpandableRow: ({
  prescribedBy: doctor,
  status,
  ...vaccination
}: VaccinationsExpandableRowProps) => JSX.Element;
