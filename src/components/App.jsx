import { Searchbar, ImageGallery, Modal, Loader, Button } from 'components';

import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
};

export class App extends Component {
  state = {
    status: Status.IDLE,
    collection: [],
    query: null,
    page: 1,

    isModalOpen: false,
    currentImg: {
      imgUrl: '',
      altText: '',
    },
  };

  BASE_URL = 'https://pixabay.com/api/';
  params = new URLSearchParams({
    key: '30371757-a5b40e590621142e63a85b7cd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  });

  componentDidUpdate(prevProps, prevState) {
    const { BASE_URL, params } = this;
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      fetch(`${BASE_URL}?${params}&q=${nextQuery}&page=${this.state.page}`)
        .then(res => res.json())
        .then(data => {
          if (data.hits.length > 0) {
            this.setState(prevState => ({
              collection: [...prevState.collection, ...data.hits],
              status: Status.RESOLVE,
            }));
            return;
          }

          this.setState({ status: Status.IDLE });

          return Promise.reject(
            new Error(`No pictures requested ${nextQuery}`)
          );
        })
        .catch(e => Notify.failure(e.message));
    }
  }

  toggleModal = (url, text) => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      currentImg: {
        imgUrl: url,
        altText: text,
      },
    }));
  };

  getQuery = value => {
    this.setState({ query: value, page: 1, collection: [] });
  };

  handleLoadMore = () => {
    this.setState({ status: Status.PENDING });
    this.setState(prev => ({
      page: prev.page + 1,
      status: Status.RESOLVE,
    }));
  };

  render() {
    const { getQuery, toggleModal, handleLoadMore } = this;
    const { collection, query, isModalOpen, currentImg, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={getQuery} />

        <ImageGallery data={collection} name={query} openModal={toggleModal} />
        {collection.length !== 0 && status === Status.RESOLVE && (
          <Button onClick={handleLoadMore} />
        )}

        {status === Status.PENDING && <Loader />}

        {isModalOpen && <Modal onShow={toggleModal} img={currentImg} />}
      </>
    );
  }
}

export default App;
