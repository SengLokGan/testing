import { ReactElement, PropsWithChildren } from 'react';
type ProtectedRouteProps = PropsWithChildren<{
  isAllowed: boolean;
  redirectPath?: string;
}>;
export declare const ProtectedRoute: ({ isAllowed, redirectPath, children }: ProtectedRouteProps) => ReactElement;
export {};
