import React, { Component } from 'react'

class ListBooks extends Component {
    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                }}/>
                                <div className="book-shelf-changer">
                                    <select>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading" selected={book.shelf === 'currentlyReading'}>Currently Reading</option>
                                        <option value="wantToRead" selected={book.shelf === 'wantToRead'}>Want to Read</option>
                                        <option value="read" selected={book.shelf === 'read'}>Read</option>
                                        <option value="none" selected={book.shelf === 'none'}>None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default ListBooks