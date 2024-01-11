import { Component, ReactNode } from 'react';
interface ErrorBoundaryProps {
  children: ReactNode;
  backOnline: boolean;
  logErrors?: boolean;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
}
declare class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State;
  private readonly consoleSourceMethod;
  constructor(props: any);
  componentDidMount(): void;
  componentDidUpdate(): void;
  componentWillUnmount(): void;
  static getDerivedStateFromError(): State;
  componentDidCatch(error: Error): void;
  render(): ReactNode;
}
declare const _default: import('react-redux').ConnectedComponent<
  typeof ErrorBoundary,
  {
    ref?: import('react').LegacyRef<ErrorBoundary> | undefined;
    children: ReactNode;
    key?: import('react').Key | null | undefined;
    fallback?: ReactNode;
    logErrors?: boolean | undefined;
    context?:
      | import('react').Context<import('react-redux').ReactReduxContextValue<any, import('redux').AnyAction>>
      | undefined;
    store?: import('redux').Store<any, import('redux').AnyAction> | undefined;
  }
>;
export default _default;
