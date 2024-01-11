/// <reference types="react" />
import type { DialysisProcessInfoForProgress } from '@types';
import { DialysisProgressInfoBlockVariants } from '@enums';
import { WithSx } from '@types';
type DialysisProgressInfoBlockProps = WithSx<{
  variant: DialysisProgressInfoBlockVariants;
  dialysisProcessInfo: DialysisProcessInfoForProgress;
  checkInfoHandler?: () => void;
  withAddInfoIcon?: boolean;
}>;
export declare const DialysisProgressInfoBlock: ({
  variant,
  dialysisProcessInfo,
  checkInfoHandler,
  withAddInfoIcon,
  sx,
}: DialysisProgressInfoBlockProps) => JSX.Element | null;
export {};
