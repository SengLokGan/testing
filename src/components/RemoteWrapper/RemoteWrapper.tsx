import { PropsWithChildren, Suspense } from 'react';
import { RemoteErrorBoundary } from '@components/RemoteWrapper/components/RemoteErrorBoundary';

type RemoteWrapperProps = PropsWithChildren<{}>;

export const RemoteWrapper = ({ children }: RemoteWrapperProps) => (
  <Suspense fallback={null}>
    <RemoteErrorBoundary>{children}</RemoteErrorBoundary>
  </Suspense>
);
