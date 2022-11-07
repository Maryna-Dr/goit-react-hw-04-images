import { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export default function Modal({ onShow, img }) {
  const handleClick = e => {
    if (e.currentTarget === e.target) onShow();
  };

  const handleKeydown = e => {
    if (e.code === 'Escape') onShow();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const { imgUrl, altText } = img;

  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={imgUrl} alt={altText} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onShow: PropTypes.func.isRequired,
  img: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
  }),
};
