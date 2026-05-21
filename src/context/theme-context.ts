import { createContext } from 'react';

export const ThemeContext = createContext<boolean | null>(null);
export const ThemeActionContext = createContext<(() => void) | null>(null);
