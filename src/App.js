import React from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from 'react-router-dom'

const debounce = require('lodash.debounce');

class BooksApp extends React.Component {
    state = {
        books: [],
        booksFound: []
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks() {
        // TODO Separar em tres variaveis e chamar apenas no inicio o getAll, alem disso usar o shelf do getAll no lugar do valor do search
        BooksAPI.getAll().then(books => this.setState({books}))
    }

    searchBooks(query) {
        if (query === '') {
            return this.clearBooksFound()
        }
        BooksAPI.search(query).then(booksFound => {
            booksFound = booksFound.error === 'empty query' ? [] : booksFound
            this.setState({booksFound})
        })
    }

    debouncedSearchBooks = debounce(this.searchBooks)

    clearBooksFound() {
        this.setState({booksFound: []})
    }

    filterBooksByShelf(shelf) {
        return this.state.books.filter(book => book.shelf === shelf)
    }

    changeBookShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks())
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to="/">Close</Link>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"
                                       onChange={event => this.debouncedSearchBooks(event.target.value)}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ListBooks books={this.state.booksFound}
                                       onChangeBookShelf={(book, shelf) => this.changeBookShelf(book, shelf)}/>
                        </div>
                    </div>
                )}/>
                <Route path="/" exact render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={this.filterBooksByShelf('currentlyReading')}
                                                   onChangeBookShelf={(book, shelf) => this.changeBookShelf(book, shelf)}/>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={this.filterBooksByShelf('wantToRead')}
                                                   onChangeBookShelf={(book, shelf) => this.changeBookShelf(book, shelf)}/>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={this.filterBooksByShelf('read')}
                                                   onChangeBookShelf={(book, shelf) => this.changeBookShelf(book, shelf)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search" onClick={() => this.clearBooksFound()}>Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
