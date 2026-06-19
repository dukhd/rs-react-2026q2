'use client';

import { usePathname } from 'next/navigation';
import type { JSX } from 'react';

interface HomeSidebarProps {
  children: React.ReactNode;
}

export const HomeSidebar = ({ children }: HomeSidebarProps): JSX.Element => {
  const pathname = usePathname();
  const isOpen = pathname.startsWith('/character/');

  return (
    <aside
      className={`bg-main border-l-second fixed top-18 right-0 z-999 box-border h-[calc(100vh-(--spacing(18)))] overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen
          ? 'w-100 border-l-4 p-6 opacity-100'
          : 'pointer-events-none w-0 border-l-0 p-0 opacity-0'
      }`}
    >
      {isOpen && children}
    </aside>
  );
};
