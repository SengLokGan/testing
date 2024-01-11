import { ReactNode } from 'react';
import { WithSx } from '@types';
export type ExpandableMenuProps = WithSx<{
  label: string;
  options?: {
    value: string | ReactNode;
    optionCallback: () => void;
  }[];
  groupedOptions?: {
    name: string;
    options: {
      value: string;
      optionCallback: () => void;
    }[];
  }[];
}>;
export declare const ExpandableMenu: ({
  label,
  options,
  groupedOptions,
  sx,
}: ExpandableMenuProps) => JSX.Element | null;
