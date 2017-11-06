import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { timestampToString } from '../utils/helpers'
import './css/Post.css';

class Post extends Component {
  static propTypes = {
    onPostClick: PropTypes.func
  }

  render() {
    const {post, displayFullContent, onPostClick} = this.props;

    return (displayFullContent ?
      <div className='postContainer'>
        <div className='postTitle'>{post.title}</div>
        <div className='postBody'>{post.body}</div>
        <div className='postDate'>Published: {timestampToString(post.timestamp)}</div>
        <div className='postAuthor'>Author: {post.author}</div>
        <div className='postCategory'>Category: {post.category}</div>
        <div className='postScore'>Score: {post.voteScore}</div>
      </div>
      :
      <div className='postContainer'>
        <div className='postTitle'>
          <span className='postTitleClickable' onClick={() => onPostClick && onPostClick(post.id)} >{post.title}</span>
        </div>
        <div className='postDate'>Published: {timestampToString(post.timestamp)}</div>
        <div className='postScore'>Score: {post.voteScore}</div>
      </div>
    )
  }
}

export default Post;

