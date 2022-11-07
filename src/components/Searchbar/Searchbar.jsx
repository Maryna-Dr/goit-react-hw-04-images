import { useState } from 'react';
import PropTypes from 'prop-types';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BiSearchAlt } from 'react-icons/bi';

import css from './Searchbar.module.css';
// import toastify

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInputChange = e => {
    const inputValue = e.currentTarget.value.toLowerCase();
    setValue(inputValue);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      Notify.failure('Please, fill in the request field');
      return;
    }
    onSubmit(value);

    setValue('');
  };

  return (
    <header>
      <form className={css.searchbar} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.search_btn}>
          <BiSearchAlt className={css.icon} />
        </button>

        <input
          className={css.field}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
