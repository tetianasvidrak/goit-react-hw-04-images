import React, { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      alert('Please enter a name of image!');
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={e => handleSubmit(e)}>
        <button type="submit" className={css.button}>
          <span className={css['button-label']}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={event =>
            setInputValue(event.currentTarget.value.toLowerCase())
          }
        />
      </form>
    </header>
  );
};

export default SearchBar;
