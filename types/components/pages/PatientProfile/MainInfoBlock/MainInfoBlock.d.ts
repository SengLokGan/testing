/// <reference types="react" />
import { CardWithIconProps } from '@components';
type MainInfoBlockProps = Omit<CardWithIconProps, 'title'>;
export declare const MainInfoBlock: ({ ...props }: MainInfoBlockProps) => JSX.Element;
export {};
