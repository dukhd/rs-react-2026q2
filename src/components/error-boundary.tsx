import { type ErrorInfo, PureComponent, type ReactNode } from 'react';

import FallbackUI from './fallback-ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends PureComponent<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleClick = () => {
    this.setState((previous) => ({ hasError: !previous.hasError }));
  };

  render() {
    if (this.state.hasError) {
      return <FallbackUI onReturn={this.handleClick} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
