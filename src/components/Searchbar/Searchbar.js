import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = { serchQuery: '' };

  handleSearchQueryChange = e => {
    this.setState({ serchQuery: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.serchQuery.trim() === '') {
      toast.error('Вы не ввели поисковой запрос');
      return;
    }

    this.props.onSubmit(this.state.serchQuery);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s['SearchForm-button']}>
            <span className={s['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={s['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.serchQuery}
            onChange={this.handleSearchQueryChange}
          />
        </form>
      </header>
    );
  }
}
