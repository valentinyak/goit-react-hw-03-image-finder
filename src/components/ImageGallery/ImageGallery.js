import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      <ImageGalleryItem images={images} onClick={onClick} />
    </ul>
  );
}
