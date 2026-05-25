import { useContext } from 'react';

import { ThemeActionContext } from '@/context/theme-context';

export const useThemeAction = () => {
  const context = useContext(ThemeActionContext);
  if (context === null) {
    throw new Error('useThemeAction must be used within a ThemeProvider');
  }
  return context;
};
