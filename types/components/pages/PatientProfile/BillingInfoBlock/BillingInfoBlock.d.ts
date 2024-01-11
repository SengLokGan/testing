/// <reference types="react" />
import { CardWithIconProps } from '@components';
import { WithSx } from '@types';
type BillingInfoBlockProps = WithSx<{}> & Pick<CardWithIconProps, 'onIconClick' | 'onAddContent'>;
export declare const BillingInfoBlock: ({ sx, ...props }: BillingInfoBlockProps) => JSX.Element;
export {};
