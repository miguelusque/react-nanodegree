import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils/helpers';
import './css/Post.css';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onPostClick: PropTypes.func
  }

  render() {
    const {post, onPostClick} = this.props;

    return (
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
