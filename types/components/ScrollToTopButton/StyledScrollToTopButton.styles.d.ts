/// <reference types="react" />
import type { IconButtonProps } from '@mui/material/IconButton';
interface StyledScrollToTopButtonProps extends IconButtonProps {}
export declare const StyledScrollToTopButton: import('@emotion/styled').StyledComponent<
  {
    children?: import('react').ReactNode;
    classes?: Partial<import('@mui/material').IconButtonClasses> | undefined;
    color?: 'inherit' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default' | undefined;
    disabled?: boolean | undefined;
    disableFocusRipple?: boolean | undefined;
    edge?: false | 'end' | 'start' | undefined;
    size?: 'small' | 'medium' | 'large' | undefined;
    sx?: import('@mui/material').SxProps<import('@mui/material').Theme> | undefined;
  } & Omit<
    {
      action?: import('react').Ref<import('@mui/material').ButtonBaseActions> | undefined;
      centerRipple?: boolean | undefined;
      children?: import('react').ReactNode;
      classes?: Partial<import('@mui/material').ButtonBaseClasses> | undefined;
      disabled?: boolean | undefined;
      disableRipple?: boolean | undefined;
      disableTouchRipple?: boolean | undefined;
      focusRipple?: boolean | undefined;
      focusVisibleClassName?: string | undefined;
      LinkComponent?: import('react').ElementType<any> | undefined;
      onFocusVisible?: import('react').FocusEventHandler<any> | undefined;
      sx?: import('@mui/material').SxProps<import('@mui/material').Theme> | undefined;
      tabIndex?: number | undefined;
      TouchRippleProps?: Partial<import('@mui/material/ButtonBase/TouchRipple').TouchRippleProps> | undefined;
      touchRippleRef?:
        | import('react').Ref<import('@mui/material/ButtonBase/TouchRipple').TouchRippleActions>
        | undefined;
    },
    'classes'
  > &
    import('@mui/material/OverridableComponent').CommonProps &
    Omit<
      Omit<
        import('react').DetailedHTMLProps<import('react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        'ref'
      > & {
        ref?:
          | ((instance: HTMLButtonElement | null) => void)
          | import('react').RefObject<HTMLButtonElement>
          | null
          | undefined;
      },
      | 'disabled'
      | 'color'
      | 'sx'
      | keyof import('@mui/material/OverridableComponent').CommonProps
      | 'children'
      | 'size'
      | 'tabIndex'
      | 'action'
      | 'centerRipple'
      | 'disableRipple'
      | 'disableTouchRipple'
      | 'focusRipple'
      | 'focusVisibleClassName'
      | 'LinkComponent'
      | 'onFocusVisible'
      | 'TouchRippleProps'
      | 'touchRippleRef'
      | 'disableFocusRipple'
      | 'edge'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material').Theme> &
    StyledScrollToTopButtonProps,
  {},
  {}
>;
export {};
