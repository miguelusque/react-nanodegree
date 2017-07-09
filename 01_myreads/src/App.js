import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import BookSearch from './BookSearch'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  // Update books location after any book change
  onChange = (book, action) => {
    BooksAPI.update(book, action).then((books) => {
      book.shelf = action // Update book location

      if (this.state.books.filter((b) => b.id === book.id).length === 0) {
        this.state.books.push(book)
      }

      var currentlyReading = this.state.books.filter((book) => books.currentlyReading.indexOf(book.id) >= 0)
      var wantToRead = this.state.books.filter((book) => books.wantToRead.indexOf(book.id) >= 0)
      var read = this.state.books.filter((book) => books.read.indexOf(book.id) >= 0)

      this.setState({books: currentlyReading.concat(wantToRead).concat(read)})
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <BookSearch 
            maxResults={25}
            onChange={this.onChange}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div>
            <ListBooks 
              books={this.state.books}
              onChange={this.onChange}
            />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
