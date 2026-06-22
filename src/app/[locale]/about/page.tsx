import { getTranslations } from 'next-intl/server';
import { type JSX } from 'react';

const AboutPage = async (): Promise<JSX.Element> => {
  const t = await getTranslations('AboutPage');
  return (
    <div className="flex min-h-[calc(100vh-(--spacing(42)))] items-center justify-center">
      <div className="flex max-w-180 flex-col items-center gap-3">
        <h2 className="mb-3 self-start text-4xl font-bold">{t('title')}</h2>
        <p className="shadow-about-card-1 border-second rounded-2xl border-4 p-6 text-xl">
          {t('greeting')}
          <span className="text-accent-blue text-2xl font-bold">
            {t('name')}!
          </span>
          {t('intro')}
        </p>
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between md:gap-1">
          <div className="shadow-about-card-2 border-second flex h-45 w-full max-w-180 flex-col items-start gap-3 rounded-2xl border-4 p-5 md:w-88">
            <span className="text-card-sub-title bg-sub-bg-gray rounded-sm px-3 py-1 text-sm font-bold uppercase">
              {t('authorLabel')}
            </span>
            <a
              className="text-second text-xl font-bold capitalize hover:underline"
              href="https://github.com/dukhd"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Dukhd
            </a>
          </div>
          <div className="shadow-about-card-3 border-second flex h-45 w-full max-w-180 flex-col items-start gap-3 rounded-2xl border-4 p-5 md:w-88">
            <span className="text-card-sub-title bg-sub-bg-gray rounded-sm px-3 py-1 text-sm font-bold uppercase">
              {t('mentorLabel')}
            </span>
            <a
              className="text-second text-xl font-bold capitalize hover:underline"
              href="https://github.com/aleks6699"
              target="_blank"
              rel="noopener noreferrer"
            >
              @aleks6699
            </a>
            <p className="text-card-sub-title text-left text-sm font-medium">
              {t('mentorDesc')}
            </p>
          </div>
        </div>
        <p className="shadow-about-card-4 border-second flex max-w-180 flex-col items-start gap-3 rounded-2xl border-4 p-6 text-xl">
          {t('appDesc')}
        </p>
        <hr />
        <p className="text-card-sub-title text-base font-bold uppercase">
          {t('courseText')}
          <a
            className="text-second text-xl font-bold capitalize hover:underline"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('courseLink')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
