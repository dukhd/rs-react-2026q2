import type { JSX } from 'react';

const Header = (): JSX.Element => {
  return (
    <>
      <div className="">
        <h1 className="text-accent text-shadow-custom-small sm:text-shadow-custom flex items-end justify-center gap-1 text-center text-3xl font-bold sm:flex-row sm:justify-start sm:gap-2 sm:text-left sm:text-4xl">
          <span>Rick and Morty </span>
          <span className="text-main text-xl">Explorer</span>
        </h1>
      </div>
      <div></div>
    </>
  );
};

export default Header;
