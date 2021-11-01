import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './MoviesPage.module.css';
toast.configure();

export default function MoviesPage({ onFormSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeQuery = e => {
    setSearchQuery(e.target.value.toLowerCase().trim());
  };
  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
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
    onFormSubmit(searchQuery);
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
