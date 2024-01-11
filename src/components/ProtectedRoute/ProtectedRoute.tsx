import { Navigate, Outlet } from 'react-router-dom';
import { ReactElement, PropsWithChildren } from 'react';

type ProtectedRouteProps = PropsWithChildren<{
  isAllowed: boolean;
  redirectPath?: string;
}>;

export const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }: ProtectedRouteProps): ReactElement => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (children as ReactElement) : <Outlet />;
};
