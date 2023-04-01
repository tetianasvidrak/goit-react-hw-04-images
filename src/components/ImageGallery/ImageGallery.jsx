import React, { useEffect, useState } from 'react';
import css from './ImageGallery.module.css';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import { getImages } from 'services/api';

const PER_PAGE = 12;

const ImageGallery = ({ imageName }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (imageName === '') return;
    setStatus('pending');
    setPage(1);
    try {
      (async () => {
        const response = await getImages(imageName, page);
        setImages(response.hits);
        setIsButtonVisible(
          images.length && response.totalHits > PER_PAGE * page
        );
      })();
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  }, [imageName]);

  useEffect(() => {
    if (imageName === '') return;
    try {
      (async () => {
        const response = await getImages(imageName, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setIsButtonVisible(
          images.length && response.totalHits > PER_PAGE * page
        );
      })();
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  }, [page]);

  return (
    <>
      {status === 'idle' && <div>Enter image name...</div>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <p className={css['error-text']}>There are no {imageName} images</p>
      )}

      {status === 'resolved' && (
        <>
          <ul className={css.gallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                smallImage={image.webformatURL}
                largeImage={image.largeImageURL}
              />
            ))}
          </ul>
          {isButtonVisible && (
            <Button
              onClickHandler={() => setPage(prevState => prevState + 1)}
            />
          )}
        </>
      )}
    </>
  );
};

export default ImageGallery;
