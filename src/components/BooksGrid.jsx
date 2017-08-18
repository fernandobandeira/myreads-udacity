import React from 'react';

const BooksGrid = function ({ books, getBookShelf, onChangeBookShelf }) {
  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              {(book.imageLinks !== undefined &&
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                  }}
                />
              )}
              <div className="book-shelf-changer">
                <select
                  value={getBookShelf !== undefined ? getBookShelf(book) : book.shelf}
                  onChange={event => onChangeBookShelf(book, event.target.value)}
                >
                  <option disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {(book.authors !== undefined &&
              <div className="book-authors">{book.authors.join(', ')}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default BooksGrid;
