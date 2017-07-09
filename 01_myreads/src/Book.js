import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static propTypes = {
		value: PropTypes.PropTypes.object.isRequired, // Book object
		onChange: PropTypes.func.isRequired 
	}

	render() {
		const {value, onChange} = this.props

        // Some results do not have an image thumbnail
        const backgroundImage = value.imageLinks ? value.imageLinks.thumbnail : ""

        // Some results do not have an author
        const authors = value.authors ? value.authors.join(", ") : "";

		return(
	        <div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{
	            	width: 128,
	            	height: 193,
	            	backgroundImage: `url(${backgroundImage})`
	            }}></div>
	            <div className="book-shelf-changer">
	              <select value={value.shelf} onChange={(event) => onChange(this.props.value, event.target.value)}>
	                <option value="moveTo" disabled>Move to...</option>
            		<option value="currentlyReading">Currently Reading</option>
            		<option value="wantToRead">Want to Read</option>
            		<option value="read">Read</option>
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