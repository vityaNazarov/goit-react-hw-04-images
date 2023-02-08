import { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import styles from '../Searchbar/Searchbar.module.css';

import initialState from './initialState';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange =useCallback(e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  },[]);

  const handleSubmit = e => {
    e.preventDefault();
    if (state.search.trim().toLowerCase() === '') {
      return toast.warn('Enter correct search!');
    }

    onSubmit(state.search);
    setState({ ...initialState});
  };

  const { search } = state;

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={styles.Button}
          aria-label="search-button"
        >
          <span className={styles.Label}>
            <ImSearch />
          </span>
        </button>

        <input
          name="search"
          value={search}
          className={styles.Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
