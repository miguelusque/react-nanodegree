import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addComment as addCommentServer } from '../utils/api';
import { uuidv4 } from '../utils/helpers'
import './css/NewComment.css';

class NewComment extends Component {
  static defaultProps = {
    onCanceled: () => {},
    onSaved: () => {}
  };

  static propTypes = {
    onSaved: PropTypes.func,
    onCanceled: PropTypes.func,
    parentId: PropTypes.string.isRequired
  };

  // This method handles the onSave event
  onSaveHandler = () => {
    const comment = {
      id: uuidv4(),
      body: this.body ? this.body.value : '',
      author: this.author ? this.author.value : '',
      timestamp: Date.now(),
      parentId: this.props.parentId,
      voteScore: 1
    };

    // Add the post on both server and local
    addCommentServer(comment)
      .then(this.props.onSaved(comment));
  }

  // This method handles the onCancel event
  onCancelHandler = () => this.props.onCanceled();

  render() {
    return (
      <div className='newCommentContainer'>
        <label>Body</label>
        <textarea className='newCommentBody' rows="10" type='text' ref={(body) => this.body = body}/>
        <label>Author</label>
        <div className='paddedInput'>
          <input className='newCommentAuthor' type='text' ref={(author) => this.author = author}/>
        </div>
        <div className='newCommentButtons'>
          <button className='newCommentButton' onClick={this.onCancelHandler}>Cancel</button>
          <button className='newCommentButton' onClick={this.onSaveHandler}>Save</button>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   addComment: (parentId, comment) => dispatch(addComment(parentId, comment))
// });

//export default connect(null, mapDispatchToProps)(NewComment);
export default NewComment;
