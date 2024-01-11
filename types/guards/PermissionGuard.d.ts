import { PropsWithChildren } from 'react';
import { UserPermissions, UserRoles } from '@enums';
type PermissionGuardProps = PropsWithChildren<{
  permissions?: UserPermissions | UserPermissions[];
  roles?: UserRoles | UserRoles[];
  invert?: boolean;
  exact?: boolean;
}>;
export declare const PermissionGuard: ({
  children,
  invert,
  permissions,
  roles,
  exact,
}: PermissionGuardProps) => JSX.Element;
export {};
