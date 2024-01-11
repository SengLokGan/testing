import type { VirologyStatus } from '@types';
import { Virus } from '@enums';

export const getPatientVirologyStatus = (virologyInfo: VirologyStatus | undefined) => {
  const virusKeys = virologyInfo && (Object.keys(virologyInfo) as Virus[]);
  const virology = virusKeys ? virusKeys.filter((virology: Virus) => virology !== Virus.Hbsab) : [];

  const hasVirus = virology.map((virus) => virologyInfo?.[virus]).includes('reactive');

  return { hasVirus, virology };
};
