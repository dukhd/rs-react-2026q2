import type { JSX } from 'react';
import { NavLink } from 'react-router';

import MoonIcon from '@/assets/images/svg/moon.svg';
import SunIcon from '@/assets/images/svg/sun.svg';
import { useTheme } from '@/hooks/use-theme';
import { useThemeAction } from '@/hooks/use-theme-action';

const Header = (): JSX.Element => {
  const darkMode = useTheme();
  const toggleTheme = useThemeAction();
  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
      <h1 className="text-main-title-1 text-shadow-custom-small sm:text-shadow-custom flex items-end justify-center gap-1 text-center text-3xl font-bold sm:flex-row sm:justify-start sm:gap-2 sm:text-left sm:text-4xl">
        <span>Rick and Morty </span>
        <span className="text-main-title-2 text-xl">Explorer</span>
      </h1>
      <div className="text-nav flex gap-4 text-xl font-bold">
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
      <div>
        <button
          onClick={toggleTheme}
          aria-label={
            darkMode ? 'Switch to light theme' : 'Switch to dark theme'
          }
          className="bg-accent-yellow shadow-theme-tgl border-theme-tgl-main cursor-pointer rounded-4xl border-2 px-2 py-2 transition-all duration-300 hover:shadow-none"
        >
          <img src={darkMode ? MoonIcon : SunIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Header;
