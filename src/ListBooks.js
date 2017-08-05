import React, {Component} from 'react'

class ListBooks extends Component {
    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                {(book.imageLinks !== undefined &&
                                    <div className="book-cover" style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                    }}/>
                                )}
                                <div className="book-shelf-changer">
                                    <select value={book.shelf}>
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
        )
    }
}

export default ListBooks