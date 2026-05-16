import type { JSX } from 'react';
import { NavLink } from 'react-router';

const Header = (): JSX.Element => {
  return (
    <>
      <div className="text-main flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
        <h1 className="text-accent text-shadow-custom-small sm:text-shadow-custom flex items-end justify-center gap-1 text-center text-3xl font-bold sm:flex-row sm:justify-start sm:gap-2 sm:text-left sm:text-4xl">
          <span>Rick and Morty </span>
          <span className="text-main text-xl">Explorer</span>
        </h1>
        <div className="flex gap-4 text-lg font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'underline decoration-2' : 'no-underline'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'underline decoration-2' : 'no-underline'
            }
          >
            About
          </NavLink>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Header;
