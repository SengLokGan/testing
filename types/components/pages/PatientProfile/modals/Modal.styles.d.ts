/// <reference types="react" />
export declare const StyledStartIconButton: import('@emotion/styled').StyledComponent<
  {
    children?: import('react').ReactNode;
    classes?: Partial<import('@mui/material/Button').ButtonClasses> | undefined;
    color?: 'inherit' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined;
    disabled?: boolean | undefined;
    disableElevation?: boolean | undefined;
    disableFocusRipple?: boolean | undefined;
    endIcon?: import('react').ReactNode;
    fullWidth?: boolean | undefined;
    href?: string | undefined;
    size?: 'small' | 'medium' | 'large' | undefined;
    startIcon?: import('react').ReactNode;
    sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
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
      sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
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
      | 'fullWidth'
      | 'sx'
      | keyof import('@mui/material/OverridableComponent').CommonProps
      | 'children'
      | 'size'
      | 'variant'
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
      | 'href'
      | 'disableFocusRipple'
      | 'disableElevation'
      | 'endIcon'
      | 'startIcon'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme>,
  {},
  {}
>;
