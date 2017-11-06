import React, { Component } from 'react';
import { timestampToString } from '../utils/helpers'
import './css/PostDetails.css';

class PostDetails extends Component {
  render() {
    const {post} = this.props;

    return (
      <div className='postDetailsContainer'>
        <div className='postDetailsTitle'>{post.title}</div>
        <div className='postDetailsBody'>{post.body}</div>
        <div className='postDetailsAuthorTitle'>Posted by <span className='postDetailsAuthor'>{post.author}</span>.</div>
        <div>
          <span className='postDetailsCategory'>#{post.category}</span>
          <span className='postDetailsScore'> ({`${post.voteScore} `}{Math.abs(post.voteScore) === 1 ? 'vote': 'votes'}).</span>
        </div>


        <div className='postDetailsDate'> {timestampToString(post.timestamp)}</div>
      </div>
    )
  }
}

export default PostDetails;
