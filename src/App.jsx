import SearchImages from 'modules/SearchImages/SearchImages';
import React from 'react';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <SearchImages />
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};
