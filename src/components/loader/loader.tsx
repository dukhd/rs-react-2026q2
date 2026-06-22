import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

import styles from './loader.module.css';

const Loader = (): JSX.Element => {
  const t = useTranslations('Loader');
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-10 flex flex-col items-center self-center"
    >
      <span className="sr-only">{t('text')}</span>
      <div aria-hidden="true" data-glitch={t('text')} className={styles.glitch}>
        {t('text')}
      </div>
    </div>
  );
};

export default Loader;
