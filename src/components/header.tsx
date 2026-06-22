'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

import MoonIcon from '@/assets/images/svg/moon.svg';
import SunIcon from '@/assets/images/svg/sun.svg';
import { useTheme } from '@/hooks/use-theme';
import { useThemeAction } from '@/hooks/use-theme-action';
import { Link, usePathname } from '@/i18n/routing';

import LanguageToggle from './language-toggle';

const Header = (): JSX.Element => {
  const t = useTranslations('Header');
  const darkMode = useTheme();
  const toggleTheme = useThemeAction();
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const isActive =
      href === '/' ? pathname === '/' : pathname?.startsWith(href);
    return isActive ? 'underline decoration-2' : 'no-underline';
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
      <h1 className="text-main-title-1 text-shadow-custom-small sm:text-shadow-custom flex items-end justify-center gap-1 text-center text-3xl font-bold sm:flex-row sm:justify-start sm:gap-2 sm:text-left sm:text-4xl">
        <span>{t('title')}</span>
        <span className="text-main-title-2 text-xl">{t('subtitle')}</span>
      </h1>
      <div className="text-nav flex gap-4 text-xl font-bold">
        <Link href="/" className={getLinkClassName('/')}>
          {t('HomeLink')}
        </Link>
        <Link href="/about" className={getLinkClassName('/about')}>
          {t('AboutLink')}
        </Link>
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggleTheme}
          aria-label={darkMode ? t('switchToLight') : t('switchToDark')}
          className="bg-accent-yellow shadow-theme-tgl border-theme-tgl-main cursor-pointer rounded-4xl border-2 px-2 py-2 transition-all duration-300 hover:shadow-none"
        >
          <Image
            src={darkMode ? MoonIcon : SunIcon}
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
          />
        </button>
        <LanguageToggle />
      </div>
    </div>
  );
};

export default Header;
