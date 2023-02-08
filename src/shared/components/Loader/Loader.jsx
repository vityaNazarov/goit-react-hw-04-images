import React from 'react';

import { RotatingLines } from 'react-loader-spinner';

import styles from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.load_wrapper}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
export default Loader;
