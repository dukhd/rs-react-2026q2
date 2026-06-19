'use client';

import {
  type JSX,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { ThemeActionContext, ThemeContext } from './theme-context';

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    setDarkMode((mode) => !mode);
  }, []);

  return (
    <ThemeContext.Provider value={darkMode}>
      <ThemeActionContext.Provider value={toggleTheme}>
        {children}
      </ThemeActionContext.Provider>
    </ThemeContext.Provider>
  );
};
