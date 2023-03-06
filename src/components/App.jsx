import { useCallback, useEffect, useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import { fetchImage } from '../services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedImgs, setLoadedImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [queryLength, setQueryLength] = useState(0);
  const [modalImage, setModalImage] = useState({ link: '', alt: '' });

  const showNotification = useCallback(
    images => {
      if (page === 1) {
        images.hits.length > 0
          ? toast.success(` Wow! We found ${images.total} results!`, {
              theme: 'colored',
            })
          : toast.warn(`Sorry, but there are no results for your query`, {
              theme: 'colored',
            });
      }
    },
    [page]
  );

  useEffect(() => {
    if (searchQuery !== '') {
      try {
        setIsLoading(true);

        fetchImage(searchQuery, page).then(images => {
          setLoadedImgs(prevState => [...prevState, ...images.hits]);
          setQueryLength(images.totalHits);
          showNotification(images);
        });
      } catch (error) {
        toast.error('Oooops something went wrong...');
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchQuery, page, showNotification]);

  const handleFormSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setLoadedImgs([]);
    }
  };

  const handleImageClick = image => {
    const { largeImageURL, tags } = image;

    setIsLoading(true);
    setShowModal(true);
    setModalImage({ link: largeImageURL, alt: tags });
  };

  const handleLoadMoreBtnClick = () => setPage(prevState => prevState + 1);
  const handleModalLoaded = () => setIsLoading(false);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        onClick={handleImageClick}
        images={loadedImgs}
      ></ImageGallery>

      {isLoading && (
        <RingLoader
          color="#3f51b5"
          size="120px"
          aria-label="Loading Spinner"
          speedMultiplier={0.7}
          cssOverride={{
            display: 'block',
            margin: '50px auto ',
            borderColor: '#3f51b5',
          }}
        />
      )}

      <>
        {loadedImgs.length >= 12 &&
          isLoading === false &&
          loadedImgs.length !== queryLength && (
            <Button text="Load more" onClick={handleLoadMoreBtnClick}></Button>
          )}
      </>

      {showModal && (
        <Modal
          image={modalImage}
          onLoad={handleModalLoaded}
          onClose={handleModalClose}
        ></Modal>
      )}
      <ToastContainer />
    </>
  );
};
