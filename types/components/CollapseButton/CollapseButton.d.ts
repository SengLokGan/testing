/// <reference types="react" />
import type { WithSx } from '@types';
export type CollapseButtonProps = WithSx<{
  isCollapsed: boolean;
  onClick: () => void;
}>;
export declare const CollapseButton: ({ isCollapsed, onClick, sx }: CollapseButtonProps) => JSX.Element;
export default CollapseButton;
