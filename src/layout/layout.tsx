import { type JSX } from 'react';
import { Outlet } from 'react-router';

import ErrorBoundary from '@/components/error-boundary';
import Header from '@/components/header';
import { ThemeProvider } from '@/context/theme-provider';

const Layout = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <header className="bg-header-bg border-b-accent shadow-header fixed top-0 z-1000 w-full border-b-6 px-5 py-4">
          <Header />
        </header>
        <main className="px-5 pt-22 pb-34">
          <Outlet />
        </main>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default Layout;
