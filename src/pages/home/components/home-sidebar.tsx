import type { JSX } from 'react';
import { Outlet } from 'react-router';

interface HomeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeSidebar = ({
  isOpen,
  onClose,
}: HomeSidebarProps): JSX.Element => (
  <aside
    className={`bg-main border-l-second fixed top-18 right-0 z-999 box-border h-[calc(100vh-(--spacing(18)))] overflow-x-hidden overflow-y-auto border-l-4 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-100 p-6 opacity-100' : 'pointer-events-none w-0 p-0 opacity-0'
    }`}
  >
    {isOpen && <Outlet context={{ onClose }} />}
  </aside>
);
