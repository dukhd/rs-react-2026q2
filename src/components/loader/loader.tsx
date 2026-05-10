import type { JSX } from 'react';

import styles from './loader.module.css';

const Loader = (): JSX.Element => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-10 flex flex-col items-center self-center"
    >
      <span className="sr-only">Loading...</span>
      <div
        aria-hidden="true"
        data-glitch="Loading..."
        className={styles.glitch}
      >
        Loading...
      </div>
    </div>
  );
};

export default Loader;
