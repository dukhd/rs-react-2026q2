import { type JSX, useState } from 'react';

import Button from './ui/button';

const ErrorButton = (): JSX.Element => {
  const [testError, setTestError] = useState<boolean>(false);

  const handleTriggerError = (): void => {
    setTestError(true);
  };

  if (testError) {
    throw new Error('Testing Errors!');
  }

  return (
    <Button text="Trigger Error" type="button" onClick={handleTriggerError} />
  );
};

export default ErrorButton;
