
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired, // Shelf title
		books: PropTypes.array.isRequired, // Books on the shelf 
		onChange: PropTypes.func.isRequired
	}

	render() {
		return(
			<div className="bookshelf">
	          <h2 className="bookshelf-title">{this.props.title}</h2>
	          <div className="bookshelf-books">
	            <ol className="books-grid">
	              { this.props.books.map((book) => (
	                <li key={book.id}>
	                  <Book value={book} onChange={this.props.onChange} />
	                </li>
	              ))}
	            </ol>
	          </div>
	        </div>
		)
	}
}

export default Bookshelf