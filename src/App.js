import React from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from "react-router-dom";

class BooksApp extends React.Component {
    state = {
        books: [],
        booksFound: []
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks() {
        BooksAPI.getAll().then(books => this.setState({books}))
    }

    searchBooks(query) {
        if (query === '') {
            this.setState({booksFound: []})
            return
        }
        BooksAPI.search(query).then(booksFound => this.setState({booksFound}))
    }

    filterBooksByShelf(shelf) {
        return this.state.books.filter(book => book.shelf === shelf)
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => {
                    this.searchBooks()
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
                                <ListBooks books={this.state.booksFound}/>
                            </div>
                        </div>
                    )
                }}/>
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
                                        <ListBooks books={this.filterBooksByShelf('currentlyReading')}/>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={this.filterBooksByShelf('wantToRead')}/>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ListBooks books={this.filterBooksByShelf('read')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
