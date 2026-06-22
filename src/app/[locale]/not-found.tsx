import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type JSX } from 'react';

const NotFoundPage = (): JSX.Element => {
  const t = useTranslations('NotFoundPage');
  return (
    <div className="flex min-h-[calc(100vh-(--spacing(42)))] items-center justify-center">
      <div className="flex max-w-120 flex-col items-center gap-3 text-center">
        <h2 className="mb-7 text-8xl font-bold">
          <p>404</p>
          <p className="text-lg">{t('text')}</p>
        </h2>

        <h3 className="text-2xl font-semibold">
          <p>{t('titleFirstPart')}</p>
          <p>{t('titleSecondPart')}</p>
        </h3>

        <p className="mb-5 text-base">{t('desc')}</p>

        <Link
          className="bg-accent text-second border-border-main shadow-card cursor-pointer rounded-xl border-3 px-7 py-2 text-sm font-bold tracking-wide uppercase transition-shadow duration-300 ease-in-out hover:shadow-none sm:text-base md:text-lg"
          href="/"
        >
          {t('btn')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
