/// <reference types="react" />
export type ClinicalNoteCardListItemUserInfoProps = {
  user: {
    id: number;
    name: string;
    deleted: boolean;
  };
  date: Date | string;
};
export declare const ClinicalNoteCardListItemUserInfo: ({
  user,
  date,
}: ClinicalNoteCardListItemUserInfoProps) => JSX.Element;
