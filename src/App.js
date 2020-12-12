import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import pixabayAPI from './services/pixabay-api';

import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  state = {
    serchQuery: '',
    currentPage: 1,
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
    openedImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.serchQuery !== prevState.serchQuery) {
      this.setState({ currentPage: 1, images: [], status: 'pending' });
      setTimeout(() => {
        this.makeFetch();
      });
    }
  }

  handleFormSubmit = serchQuery => {
    this.setState({ serchQuery });
  };

  handleBtnClick = () => {
    this.setState({ status: 'pending' });
    this.makeFetch();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleImgClick = e => {
    const largeImg = e.currentTarget.alt;

    this.setState(state => {
      return { showModal: !state.showModal, openedImg: largeImg };
    });
  };

  handleOverleyClick = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    this.setState(state => {
      return { showModal: !state.showModal };
    });
  };

  makeFetch() {
    pixabayAPI
      .fetchImages(this.state.serchQuery, this.state.currentPage)
      .then(parsedResponse => {
        this.setState(state => {
          return {
            images: [...state.images, ...parsedResponse.hits],
            currentPage: state.currentPage + 1,
            status: 'resolved',
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    return (
      <div className={s.App}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          onClick={this.handleImgClick}
        />
        {this.state.status === 'pending' ? (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        ) : (
          <></>
        )}
        {this.state.images.length > 0 ? (
          <Button onClick={this.handleBtnClick} />
        ) : (
          <></>
        )}

        {this.state.images.length === 0 && this.state.status === 'resolved' ? (
          toast.info('По вашему запросу ничего не найдено')
        ) : (
          <></>
        )}
        {this.state.status === 'rejected' ? (
          <div>{this.state.error}</div>
        ) : (
          <></>
        )}
        {this.state.showModal && (
          <Modal
            largeImg={this.state.openedImg}
            onClick={this.handleOverleyClick}
          />
        )}
      </div>
    );
  }
}
