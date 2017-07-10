import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

	render() {
    const shelves = {currentlyReading: 'Currently Reading', wantToRead: 'Want to Read', read: 'Read' }

		return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { Object.keys(shelves).map((key) => (
                <Bookshelf
                  key={key}
                  title={shelves[key]}
                  books={this.props.books.filter((book) => book.shelf === key)}
                  onChange={this.props.onChange}
              />))
            }
          </div>
        </div>
      </div>
		)
	}
}

export default ListBooks