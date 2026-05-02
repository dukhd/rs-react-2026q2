import { Component } from 'react';

import styles from './loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div
        data-glitch="Loading..."
        className={`${styles.glitch} mt-10 self-center`}
      >
        Loading...
      </div>
    );
  }
}

export default Loader;
