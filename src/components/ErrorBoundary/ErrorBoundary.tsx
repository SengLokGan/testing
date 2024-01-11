import { Component, createRef, ReactNode } from 'react';
import { ErrorLogging } from '@services';
import { FrontendErrorType } from '@enums';
import { connect } from 'react-redux';
import { checkIsDevelopmentMode } from '@utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  backOnline: boolean;
  logErrors?: boolean;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  };
  private readonly consoleSourceMethod;

  constructor(props) {
    super(props);
    this.consoleSourceMethod = createRef();
    this.consoleSourceMethod.current = window.console.error;
  }

  componentDidMount() {
    if (this.props.logErrors) {
      const source = this.consoleSourceMethod.current;
      window.console.error = function () {
        [...arguments].forEach((message) => ErrorLogging.catch(FrontendErrorType.CONSOLE, new Error(message)));

        if (checkIsDevelopmentMode()) {
          source.apply(this, arguments as any);
        } else {
          source.apply(
            this,
            [...arguments].filter((message) => !ErrorLogging.checkIsErrorInExceptionList(new Error(message))),
          );
        }
      };
    }
  }

  componentDidUpdate() {
    if (this.props?.backOnline && this.props.logErrors) ErrorLogging.send();
  }

  componentWillUnmount() {
    if (this.props.logErrors) window.console.error = this.consoleSourceMethod;
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    if (this.props.logErrors) ErrorLogging.catch(FrontendErrorType.RENDER, error);
  }

  public render() {
    if (this.state.hasError && this.props.fallback) return this.props.fallback;

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  backOnline: state.system?.networkConnection?.backOnline || false,
});

export default connect(mapStateToProps)(ErrorBoundary);
