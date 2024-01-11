import { NoticeBlockType } from '@enums';
export declare const useGetAllergyNoticeInfo: (id: number) => {
  noticeInfo: {
    type: NoticeBlockType;
    title?: string | undefined;
    text: string;
  };
  noticeLoading: boolean;
};
