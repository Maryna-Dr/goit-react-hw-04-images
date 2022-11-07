import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components';

import css from './ImageGallery.module.css';

export default function ImageGallery({ data, name, openModal }) {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          name={name}
          largeImg={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  name: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};
