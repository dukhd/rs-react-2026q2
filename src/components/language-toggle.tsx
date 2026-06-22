'use client';

import { useLocale } from 'next-intl';
import { JSX } from 'react/jsx-runtime';

import { usePathname, useRouter } from '@/i18n/routing';

const LanguageToggle = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isRu = locale === 'ru';

  const handleToggle = () => {
    const newLocale = isRu ? 'en' : 'ru';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle language"
      className="border-accent bg-toggle-bg shadow-theme-tgl flex cursor-pointer items-center rounded-4xl border-2 p-1 transition-all duration-300 hover:shadow-none"
    >
      <div className="flex w-full gap-2 text-base font-bold tracking-wider uppercase select-none">
        <span
          className={`flex justify-center rounded-4xl px-2 py-1 transition-colors duration-300 ${
            isRu ? 'text-white' : 'bg-accent text-black'
          }`}
        >
          EN
        </span>
        <span
          className={`flex justify-center rounded-4xl px-2 py-1 transition-colors duration-300 ${
            isRu ? 'bg-accent text-black' : 'text-white'
          }`}
        >
          RU
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
