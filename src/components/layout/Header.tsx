import type { JSX } from 'react';

const Header = (): JSX.Element => {
  return (
    <header className="mt-7 mb-10 flex justify-center px-5">
      <h1 className="from-accent via-accent-muted to-success bg-linear-to-r bg-clip-text text-center text-4xl font-bold text-transparent capitalize drop-shadow-lg sm:text-5xl">
        The grand submission
      </h1>
    </header>
  );
};

export default Header;
