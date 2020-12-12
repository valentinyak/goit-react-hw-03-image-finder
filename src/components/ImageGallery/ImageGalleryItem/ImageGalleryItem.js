import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onClick }) {
  return images.map(img => {
    return (
      <li className={s.ImageGalleryItem} key={img.id}>
        <img
          src={img.webformatURL}
          alt={img.largeImageURL}
          className={s['ImageGalleryItem-image']}
          onClick={onClick}
        />
      </li>
    );
  });
}
