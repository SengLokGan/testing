/// <reference types="react" />
import { FooterPlace } from '@enums';
import { WithSx } from '@types';
interface FooterProps extends WithSx {
  place: FooterPlace;
}
export declare const Footer: ({ place, sx }: FooterProps) => JSX.Element;
export {};
