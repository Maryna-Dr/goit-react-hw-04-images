import { Searchbar, ImageGallery, Modal, Loader, Button } from 'components';

import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
};

const BASE_URL = 'https://pixabay.com/api/';
const params = new URLSearchParams({
  key: '30371757-a5b40e590621142e63a85b7cd',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 12,
});

export default function App() {
  const [status, setStatus] = useState(Status.IDLE);
  const [collection, setCollection] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({
    imgUrl: '',
    altText: '',
  });

  useEffect(() => {
    if (query === null) {
      return;
    }

    setStatus(Status.PENDING);

    fetch(`${BASE_URL}?${params}&q=${query}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (data.hits.length > 0) {
          setCollection(prev => [...prev, ...data.hits]);
          setStatus(Status.RESOLVE);
          return;
        }

        setStatus({ status: Status.IDLE });

        return Promise.reject(new Error(`No pictures requested ${query}`));
      })
      .catch(e => Notify.failure(e.message));
  }, [page, query]);

  const toggleModal = (url, text) => {
    setIsModalOpen(!isModalOpen);
    setCurrentImg({
      imgUrl: url,
      altText: text,
    });
  };

  const getQuery = value => {
    setQuery(value);
    setPage(1);
    setCollection([]);
  };

  const handleLoadMore = () => {
    setStatus(Status.PENDING);
    setPage(prev => prev + 1);
    setStatus(Status.RESOLVE);
  };

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
