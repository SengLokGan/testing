/// <reference types="react" />
import type { WithSx } from '@types';
type EmptyCardComponentProps = WithSx<{
  text?: string;
  addContentPermission?: boolean;
  onClick: () => void;
}>;
export declare const EmptyCardContent: ({
  onClick,
  text,
  addContentPermission,
  sx,
}: EmptyCardComponentProps) => JSX.Element;
export {};
