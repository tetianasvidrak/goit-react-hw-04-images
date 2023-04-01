import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal';

const ImageGalleryItem = ({ smallImage, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className={css['gallery-item']}>
        <div className={css['image-container']}>
          <img
            className={css.image}
            src={smallImage}
            alt="small"
            onClick={() => setShowModal(prevState => !prevState)}
          />
        </div>
      </li>
      {showModal && (
        <Modal
          onClose={() => setShowModal(prevState => !prevState)}
          children={
            <img className={css['modal-image']} src={largeImage} alt="large" />
          }
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
