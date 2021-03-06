import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import s from './MoviesSearchBar.module.css';
toast.configure();

export default function MoviesSearchBar({ onFormSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeQuery = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warning('Введите свой запрос!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onFormSubmit(searchQuery.trim());
    setSearchQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          onChange={handleChangeQuery}
          className={s.SearchFormInput}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie here"
        />
      </form>
    </header>
  );
}
MoviesSearchBar.propTypes = {
  onFormSubmit: PropTypes.func,
};
