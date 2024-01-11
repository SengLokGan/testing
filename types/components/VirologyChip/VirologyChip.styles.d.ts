/// <reference types="react" />
import { ChipProps } from '@mui/material/Chip';
import { Virus } from '@enums';
interface StyledVirologyChipProps extends ChipProps {
  name: Virus;
}
export declare const StyledVirologyChip: import('@emotion/styled').StyledComponent<
  {
    avatar?: import('react').ReactElement<any, string | import('react').JSXElementConstructor<any>> | undefined;
    children?: null | undefined;
    classes?: Partial<import('@mui/material/Chip').ChipClasses> | undefined;
    clickable?: boolean | undefined;
    color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default' | undefined;
    deleteIcon?: import('react').ReactElement<any, string | import('react').JSXElementConstructor<any>> | undefined;
    disabled?: boolean | undefined;
    icon?: import('react').ReactElement<any, string | import('react').JSXElementConstructor<any>> | undefined;
    label?: import('react').ReactNode;
    onDelete?: ((event: any) => void) | undefined;
    size?: 'small' | 'medium' | undefined;
    skipFocusWhenDisabled?: boolean | undefined;
    sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
    tabIndex?: number | undefined;
    variant?: 'filled' | 'outlined' | undefined;
  } & import('@mui/material/OverridableComponent').CommonProps &
    Omit<
      Omit<import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | import('react').RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      | 'disabled'
      | 'color'
      | 'label'
      | 'sx'
      | keyof import('@mui/material/OverridableComponent').CommonProps
      | 'children'
      | 'size'
      | 'variant'
      | 'tabIndex'
      | 'icon'
      | 'avatar'
      | 'clickable'
      | 'deleteIcon'
      | 'onDelete'
      | 'skipFocusWhenDisabled'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme> &
    StyledVirologyChipProps,
  {},
  {}
>;
export {};
