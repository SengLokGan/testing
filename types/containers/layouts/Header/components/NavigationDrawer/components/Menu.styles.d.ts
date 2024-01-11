/// <reference types="react" />
export declare const StyledListItem: import('@emotion/styled').StyledComponent<
  import('@mui/material').ListItemButtonBaseProps &
    Omit<
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
      Omit<import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | import('react').RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      | 'disabled'
      | 'alignItems'
      | 'sx'
      | 'classes'
      | 'className'
      | 'style'
      | 'children'
      | 'autoFocus'
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
      | 'dense'
      | 'disableGutters'
      | 'divider'
      | 'selected'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material').Theme>,
  {},
  {}
>;
