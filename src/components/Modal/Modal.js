import React from 'react';
import s from './Modal.module.css';

export default function Modal({ largeImg, onClick }) {
  return (
    <div className={s.Overlay} onClick={onClick}>
      <div className={s.Modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>
  );
}
