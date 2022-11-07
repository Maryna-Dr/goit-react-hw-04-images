import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export class Modal extends Component {
  handleClick = e => {
    if (e.currentTarget === e.target) this.props.onShow();
  };

  handleKeydown = e => {
    if (e.code === 'Escape') this.props.onShow();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    const { imgUrl, altText } = this.props.img;
    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img src={imgUrl} alt={altText} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onShow: PropTypes.func.isRequired,
  img: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
  }),
};

export default Modal;
