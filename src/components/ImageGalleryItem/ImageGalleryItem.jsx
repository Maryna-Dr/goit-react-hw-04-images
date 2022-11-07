// import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  smallImg,
  name,
  largeImg,
  openModal,
}) {
  return (
    <li className={css.item} onClick={() => openModal(largeImg, name)}>
      <img className={css.img} src={smallImg} alt={name} />
    </li>
  );
}
