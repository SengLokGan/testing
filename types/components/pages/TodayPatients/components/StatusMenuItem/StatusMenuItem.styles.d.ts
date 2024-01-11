/// <reference types="react" />
export declare const StyledStatusMenuItem: import('@emotion/styled').StyledComponent<
  {
    children?: import('react').ReactNode;
    classes?: Partial<import('@mui/material/ToggleButton').ToggleButtonClasses> | undefined;
    color?: 'error' | 'standard' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined;
    disabled?: boolean | undefined;
    disableFocusRipple?: boolean | undefined;
    fullWidth?: boolean | undefined;
    onChange?: ((event: import('react').MouseEvent<HTMLElement, MouseEvent>, value: any) => void) | undefined;
    onClick?: ((event: import('react').MouseEvent<HTMLElement, MouseEvent>, value: any) => void) | undefined;
    selected?: boolean | undefined;
    size?: 'small' | 'medium' | 'large' | undefined;
    sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
    value: {};
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
      | 'value'
      | 'fullWidth'
      | 'sx'
      | keyof import('@mui/material/OverridableComponent').CommonProps
      | 'children'
      | 'size'
      | 'tabIndex'
      | 'onChange'
      | 'onClick'
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
      | 'selected'
      | 'disableFocusRipple'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme>,
  {},
  {}
>;
