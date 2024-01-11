import { UserPermissions, ViewPermissions } from '@enums';
export declare const administrationPages: () => {
  name: string;
  options: (
    | {
        value: string;
        link: string;
        permission: UserPermissions;
        active: boolean;
      }
    | {
        value: string;
        link: string;
        permission: UserPermissions;
        active?: undefined;
      }
  )[];
  accessPermissions: ViewPermissions[];
}[];
