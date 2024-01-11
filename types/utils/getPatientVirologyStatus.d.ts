import type { VirologyStatus } from '@types';
import { Virus } from '@enums';
export declare const getPatientVirologyStatus: (virologyInfo: VirologyStatus | undefined) => {
  hasVirus: boolean;
  virology: Virus[];
};
