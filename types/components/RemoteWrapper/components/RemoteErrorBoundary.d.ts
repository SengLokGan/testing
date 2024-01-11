import { Component, ReactNode } from 'react';
interface RemoteErrorBoundaryProps {
  children: ReactNode;
}
interface RemoteErrorBoundaryState {
  hasError: boolean;
}
declare class RemoteErrorBoundary extends Component<RemoteErrorBoundaryProps, RemoteErrorBoundaryState> {
  constructor(props: any);
  static getDerivedStateFromError(): {
    hasError: boolean;
  };
  componentDidCatch(error: any, errorInfo: any): void;
  render(): string | number | boolean | JSX.Element | import('react').ReactFragment | null | undefined;
}
export { RemoteErrorBoundary };
