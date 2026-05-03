import { PureComponent } from 'react';

import Button from './ui/button';

interface State {
  testError: boolean;
}

class ErrorButton extends PureComponent<object, State> {
  state = {
    testError: false,
  };

  handleTriggerError = () => {
    this.setState({ testError: true });
  };

  render() {
    if (this.state.testError) {
      throw new Error('Testing Errors!');
    }
    return (
      <Button
        text="Trigger Error"
        type="button"
        onClick={this.handleTriggerError}
      />
    );
  }
}

export default ErrorButton;
