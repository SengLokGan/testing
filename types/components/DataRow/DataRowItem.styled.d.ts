/// <reference types="react" />
export declare const DataRowItem: import('@emotion/styled').StyledComponent<
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
