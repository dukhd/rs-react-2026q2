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
    <Button
      text="Trigger Error"
      type="button"
      onClick={handleTriggerError}
      customClassName={'bg-[#FF4444] text-white px-4 py-2 text-xs sm:text-sm'}
    />
  );
};

export default ErrorButton;
