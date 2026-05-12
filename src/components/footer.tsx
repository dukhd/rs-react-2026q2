import type { JSX } from 'react';

import ErrorButton from './error-button';

const Footer = (): JSX.Element => {
  return (
    <div className="flex">
      <ErrorButton />
    </div>
  );
};

export default Footer;
