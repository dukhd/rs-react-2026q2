import { Component } from 'react';

import styles from './loader.module.css';

class Loader extends Component {
  render() {
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
  }
}

export default Loader;
