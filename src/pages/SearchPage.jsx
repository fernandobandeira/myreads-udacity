import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BooksGrid from '../components/BooksGrid';

const debounce = require('debounce-promise');

class SearchPage extends React.Component {
  constructor({ books, filterBooks, changeBookShelf }) {
    super();

    this.state = {
      books: [],
    };

    this.books = books;
    this.filterBooks = filterBooks;
    this.changeBookShelf = changeBookShelf;
    this.debouncedSearchApi = debounce(BooksAPI.search);

    this.getBookShelf = this.getBookShelf.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
  }

  getBookShelf(book) {
    let b = this.filterBooks(this.books, book.id, 'id');
    return b.length > 0 ? b[0].shelf : 'none';
  }

  searchBooks(query) {
    this.debouncedSearchApi(query).then(books => {
      if (books === undefined || books.error === 'empty query') {
        this.setState({
          books: [],
        });
      } else {
        this.setState({ books });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
                   onChange={event => this.searchBooks(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.books}
                     onChangeBookShelf={this.changeBookShelf}
                     getBookShelf={this.getBookShelf}/>
        </div>
      </div>
    );
  }
}

export default SearchPage;
