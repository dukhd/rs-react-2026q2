import type { JSX } from 'react';

import ErrorButton from './error-button';
import Pagination from './pagination/pagination';

const Footer = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <ErrorButton />
      <Pagination />
    </div>
  );
};

export default Footer;
