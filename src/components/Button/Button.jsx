import PropTypes from 'prop-types';

import css from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button onClick={onClick} className={css.btn} type="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
