/// <reference types="react" />
export declare const StyledModalPaper: import('@emotion/styled').StyledComponent<
  {
    children?: import('react').ReactNode;
    classes?: Partial<import('@mui/material/Paper').PaperClasses> | undefined;
    elevation?: number | undefined;
    square?: boolean | undefined;
    sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
    variant?: 'outlined' | 'elevation' | undefined;
  } & import('@mui/material/OverridableComponent').CommonProps &
    Omit<
      Omit<import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | import('react').RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      | 'sx'
      | keyof import('@mui/material/OverridableComponent').CommonProps
      | 'children'
      | 'variant'
      | 'elevation'
      | 'square'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme>,
  {},
  {}
>;
export declare const StyledModalHeader: import('@emotion/styled').StyledComponent<
  import('@mui/system').SystemProps<import('@mui/material/styles').Theme> & {
    children?: import('react').ReactNode;
    component?: import('react').ElementType<any> | undefined;
    ref?: import('react').Ref<unknown> | undefined;
    sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
  } & Omit<
      Omit<import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | import('react').RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      | 'sx'
      | 'ref'
      | 'children'
      | (
          | 'm'
          | 'order'
          | 'ml'
          | 'border'
          | 'boxShadow'
          | 'fontWeight'
          | 'zIndex'
          | 'alignContent'
          | 'alignItems'
          | 'alignSelf'
          | 'bottom'
          | 'boxSizing'
          | 'color'
          | 'columnGap'
          | 'display'
          | 'flexBasis'
          | 'flexDirection'
          | 'flexGrow'
          | 'flexShrink'
          | 'flexWrap'
          | 'fontFamily'
          | 'fontSize'
          | 'fontStyle'
          | 'gridAutoColumns'
          | 'gridAutoFlow'
          | 'gridAutoRows'
          | 'gridTemplateAreas'
          | 'gridTemplateColumns'
          | 'gridTemplateRows'
          | 'height'
          | 'justifyContent'
          | 'justifyItems'
          | 'justifySelf'
          | 'left'
          | 'letterSpacing'
          | 'lineHeight'
          | 'marginBottom'
          | 'marginLeft'
          | 'marginRight'
          | 'marginTop'
          | 'maxHeight'
          | 'maxWidth'
          | 'minHeight'
          | 'minWidth'
          | 'paddingBottom'
          | 'paddingLeft'
          | 'paddingRight'
          | 'paddingTop'
          | 'position'
          | 'right'
          | 'rowGap'
          | 'textAlign'
          | 'textOverflow'
          | 'textTransform'
          | 'top'
          | 'visibility'
          | 'whiteSpace'
          | 'width'
          | 'borderBottom'
          | 'borderColor'
          | 'borderLeft'
          | 'borderRadius'
          | 'borderRight'
          | 'borderTop'
          | 'flex'
          | 'gap'
          | 'gridArea'
          | 'gridColumn'
          | 'gridRow'
          | 'margin'
          | 'overflow'
          | 'padding'
          | 'bgcolor'
          | 'mt'
          | 'mr'
          | 'mb'
          | 'mx'
          | 'marginX'
          | 'my'
          | 'marginY'
          | 'p'
          | 'pt'
          | 'pr'
          | 'pb'
          | 'pl'
          | 'px'
          | 'paddingX'
          | 'py'
          | 'paddingY'
          | 'typography'
          | 'displayPrint'
        )
      | 'component'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme>,
  {},
  {}
>;
