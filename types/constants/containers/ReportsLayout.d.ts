import { ViewPermissions } from '@enums';
export declare const groupedReports: () => {
  name: string;
  options: {
    value: string;
    link: string;
    permissions: ViewPermissions[];
  }[];
  groupAccessPermissions: ViewPermissions[];
}[];
