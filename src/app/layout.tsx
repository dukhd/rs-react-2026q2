import './globals.css';

import { Metadata } from 'next';

import Header from '@/components/header';
import { HomeSidebar } from '@/components/home/home-sidebar';
import { ThemeProvider } from '@/context/theme-provider';
import StoreProvider from '@/providers/store-provider';

import { adventPro } from './layout-config';

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description:
    'Rick and Morty character database app built with React. Browse all characters, check their status, species, gender and other details from the public API.',
};

export default function RootLayout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${adventPro.variable} h-full antialiased`}>
      <body className="font-advent flex min-h-full flex-col">
        <StoreProvider>
          <ThemeProvider>
            <header className="bg-header-bg border-b-accent shadow-header fixed top-0 z-1000 w-full border-b-6 px-5 py-4">
              <Header />
            </header>

            <main className="flex-1 px-5 pt-22">{children}</main>

            <HomeSidebar>{details}</HomeSidebar>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
