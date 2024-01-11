import { Component, ReactNode } from 'react';
import ModuleNotLoaded from '@components/ModuleNotLoaded/ModuleNotLoaded';

interface RemoteErrorBoundaryProps {
  children: ReactNode;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

class RemoteErrorBoundary extends Component<RemoteErrorBoundaryProps, RemoteErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ModuleNotLoaded />;
    }

    return this.props.children;
  }
}

export { RemoteErrorBoundary };
