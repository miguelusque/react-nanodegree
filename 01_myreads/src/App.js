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
      console.log(books)
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <BookSearch maxResults={25}/>
        )}/>

        <Route exact path='/' render={() => (
          <div>
            <ListBooks books={this.state.books}/>
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
