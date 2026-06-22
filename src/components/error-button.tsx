import { useTranslations } from 'next-intl';
import { type JSX, useState } from 'react';

import Button from './ui/button';

const ErrorButton = (): JSX.Element => {
  const t = useTranslations('ErrorBtn');
  const [testError, setTestError] = useState<boolean>(false);

  const handleTriggerError = (): void => {
    setTestError(true);
  };

  if (testError) {
    throw new Error('Testing Errors!');
  }

  return (
    <Button
      text={t('btn')}
      type="button"
      onClick={handleTriggerError}
      customClassName={
        'bg-btn-red text-btn-red-text px-4 py-2 text-xs sm:text-sm'
      }
    />
  );
};

export default ErrorButton;
