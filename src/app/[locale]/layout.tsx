import '@/app/globals.css';

import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { JSX } from 'react/jsx-runtime';

import Header from '@/components/header';
import { HomeSidebar } from '@/components/home/home-sidebar';
import { ThemeProvider } from '@/context/theme-provider';
import StoreProvider from '@/providers/store-provider';

interface LocaleLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description:
    'Rick and Morty character database app built with React. Browse all characters, check their status, species, gender and other details from the public API.',
};

export default async function LocaleLayout({
  children,
  details,
}: Readonly<LocaleLayoutProps>): Promise<JSX.Element> {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <StoreProvider>
        <ThemeProvider>
          <header className="bg-header-bg border-b-accent shadow-header fixed top-0 z-1000 w-full border-b-6 px-5 py-4">
            <Header />
          </header>

          <main className="flex-1 px-5 pt-22">{children}</main>

          <HomeSidebar>{details}</HomeSidebar>
        </ThemeProvider>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
