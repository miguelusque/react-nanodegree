import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'


class BookSearch extends Component {
  static propTypes = {
    maxResults: PropTypes.number.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({query})

    if (query.trim()) {
      BooksAPI.search(query.trim(), this.props.maxResults).then((results) => {
        this.setState({results})
      })
    } else {
      this.setState({results:[]})
    }
  }

	render() {
    const {query, results} = this.state

		return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ (event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
			</div>
		)
	}
}

export default BookSearch