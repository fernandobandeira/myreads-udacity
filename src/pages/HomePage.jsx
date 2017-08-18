import React from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from '../components/BooksGrid';

const HomePage = function ({ books, filterBooks, changeBookShelf }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BooksGrid
                books={filterBooks(books, 'currentlyReading')}
                onChangeBookShelf={changeBookShelf}
              />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BooksGrid
                books={filterBooks(books, 'wantToRead')}
                onChangeBookShelf={changeBookShelf}
              />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BooksGrid
                books={filterBooks(books, 'read')}
                onChangeBookShelf={changeBookShelf}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default HomePage;
