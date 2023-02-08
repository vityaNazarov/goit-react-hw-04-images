import { useState, useEffect, useCallback } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchData } from 'shared/services/posts-api';
import Button from 'shared/components/Button/Button';
import Loader from 'shared/components/Loader/Loader';
import Modal from 'shared/components/Modal/Modal';
import { toast } from 'react-toastify';

import styles from '../SearchImages/SearchImages.module.css';

const SearchImages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState(null);
  const [imgDetails, setimgDetails] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchData(searchQuery, page);
        if (hits.length === 0) {
          toast.error('No result found!');
        }
        setItems(items => [...items, ...hits]);
        setTotal(totalHits);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, searchQuery]);

  const searchImages = query => {
    if (query !== searchQuery) {
      setPage(1);
      setItems([]);
      setSearchQuery(query);
    } else toast('you have already entered this query!');
  };

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const openModal = useCallback((largeImageURL, tags) => {
    setShowModal(true);
    setimgDetails({ largeImageURL, tags });
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setimgDetails(null);
  }, []);

  const body = document.querySelector('body');
  const isImages = Boolean(items.length);
  const totalPage = Math.ceil(total / 12);

  return (
    <div className={styles.search_images}>
      <Searchbar onSubmit={searchImages} />
      <ImageGallery items={items} onClick={openModal} />

      {loading && <Loader />}

      {err && <p className={styles.errorMessage}>{err}</p>}

      {isImages && page < totalPage && (
        <Button onLoadMore={loadMore} text={'Load more'} />
      )}

      {showModal
        ? body.classList.add('overflow-hidden')
        : body.classList.remove('overflow-hidden')}

      {showModal && (
        <Modal close={closeModal}>
          <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
        </Modal>
      )}
    </div>
  );
};

export default SearchImages;
