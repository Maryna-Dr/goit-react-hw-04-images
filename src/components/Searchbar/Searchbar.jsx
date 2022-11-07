import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { toast } from 'react-toastify';

import { BiSearchAlt } from 'react-icons/bi';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = e => {
    const value = e.currentTarget.value.toLowerCase();
    this.setState({ value: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      Notify.failure('Please, fill in the request field');
      return;
    }
    this.props.onSubmit(this.state.value);

    this.setState({ value: '' });
  };

  render() {
    const { handleInputChange, handleFormSubmit } = this;
    const { value } = this.state;
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
