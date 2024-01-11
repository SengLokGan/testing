/// <reference types="react" />
import { WithSx } from '@types';
import { NoticeBlockType } from '@enums';
export type NoticeBlockProps = WithSx<{
  title?: string;
  text?: string;
  type: NoticeBlockType;
}>;
export declare const NoticeBlock: ({ title, text, type, sx }: NoticeBlockProps) => JSX.Element;
