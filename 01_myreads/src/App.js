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
    console.log("componentDidMount")
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  // Update books location after any book change
  onChange = (book, action) => {
    BooksAPI.update(book, action).then((books) => {
      let result = 
        this.state.books.filter((b) => books.currentlyReading.indexOf(b.id) >= 0).concat(
        this.state.books.filter((b) => books.wantToRead.indexOf(b.id) >= 0).concat(
        this.state.books.filter((b) => books.read.indexOf(b.id) >= 0)))

      // If not removing a book from shelf...
      if (action !== "none") {
        if (result.filter((b) => b.id === book.id).length === 0) {
          // ... let's move the book to a shelf if not in any
          book.shelf = action
          result.push(book)
        } else {
          /// ... let's update the book's location if previously added to a shelf
          for (let b of this.state.books) {
            if (b.id === book.id) {
              b.shelf = action
              break
            }
          }
        }
      }

      this.setState({books: result})
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <ListBooks 
              books={this.state.books}
              onChange={this.onChange}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={()  => (
          <BookSearch
            books={this.state.books} 
            maxResults={25}
            onChange={this.onChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
