/// <reference types="react" />
import { StackProps } from '@mui/material/Stack';
interface StyledPatientRowStackProps extends StackProps {
  width?: number;
  height?: number;
}
export declare const StyledPatientRowStack: import('@emotion/styled').StyledComponent<
  import('@mui/system').SystemProps<import('@mui/material/styles').Theme> & {
    children?: import('react').ReactNode;
    direction?:
      | import('@mui/system').ResponsiveStyleValue<'column' | 'column-reverse' | 'row' | 'row-reverse'>
      | undefined;
    spacing?: import('@mui/system').ResponsiveStyleValue<string | number> | undefined;
    divider?: import('react').ReactNode;
    useFlexGap?: boolean | undefined;
    sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme> | undefined;
  } & import('@mui/material/OverridableComponent').CommonProps &
    Omit<
      Omit<import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | import('react').RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      | 'direction'
      | 'sx'
      | keyof import('@mui/material/OverridableComponent').CommonProps
      | 'children'
      | 'divider'
      | 'spacing'
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
      | 'useFlexGap'
    > &
    import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme> &
    StyledPatientRowStackProps,
  {},
  {}
>;
export {};
