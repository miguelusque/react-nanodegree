import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

	render() {
		return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf 
              title="Currently Reading"
              books={this.props.books.filter((book) => book.shelf === "currentlyReading")}
              onChange={this.props.onChange}
            />
            <Bookshelf
              title="Want to Read"
              books={this.props.books.filter((book) => book.shelf === "wantToRead")}
              onChange={this.props.onChange}
            />
            <Bookshelf
              title="Read"
              books={this.props.books.filter((book) => book.shelf === "read")}
              onChange={this.props.onChange}
            />∫
          </div>
        </div>
      </div>
		)
	}
}

export default ListBooks