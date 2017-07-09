import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static propTypes = {
		value: PropTypes.PropTypes.object.isRequired, // Book object
		onChange: PropTypes.func.isRequired 
	}

	render() {
		const {value, onChange} = this.props

		// Do not let moving to current shelf
		var currentlyReading
		if (value.shelf !== "currentlyReading") {
   			currentlyReading = <option value="currentlyReading">Currently Reading</option>
        }

        var wantToRead
        if (value.shelf !== "wantToRead") {
        	wantToRead = <option value="wantToRead">Want to Read</option>
        }

        var read
        if (value.shelf !== "read") {
        	read = <option value="read">Read</option>
        }

        // Some results do not have an image thumbnail
        var backgroundImage
        if ("undefined" !== typeof value.imageLinks) {
        	backgroundImage = value.imageLinks.thumbnail
        } 

        // Some results do not have an author
        var authors
        if ("undefined" !== typeof value.authors) {
        	authors = value.authors.join('; ')
        }

		return(
	        <div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{
	            	width: 128,
	            	height: 193,
	            	backgroundImage: `url(${backgroundImage})`
	            }}></div>
	            <div className="book-shelf-changer">
	              <select value="moveTo" onChange={(event) => onChange(this.props.value, event.target.value)}>
	                <option value="moveTo" disabled>Move to...</option>
            		{currentlyReading}
            		{wantToRead}
            		{read}
	                <option value="none">None</option>
	              </select>
	            </div>
	          </div>
	          <div className="book-title">{value.title}</div>
	          <div className="book-authors">{authors}</div>
	        </div>
		)
	}
}

export default Book