import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils/helpers';
import './css/Comment.css';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  render() {
    const {comment} = this.props;

    return (
      <div className='commentContainer'>
        <div className='commentBody'>{comment.body}</div>
        <div className='commentDate'>Published: {timestampToString(comment.timestamp)}</div>
        <div className='commentScore'>Score: {comment.voteScore}</div>
      </div>
    )
  }
}

export default Comment;
