import '@/app/globals.css';

import type { Metadata } from 'next';
import type { JSX } from 'react';

import { ThemeProvider } from '@/context/theme-provider';

import { adventPro } from './layout-config';

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description:
    'Rick and Morty character database app built with React. Browse all characters, check their status, species, gender and other details from the public API.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): JSX.Element {
  return (
    <html lang="en" className={`${adventPro.variable} h-full antialiased`}>
      <body className="font-advent flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
