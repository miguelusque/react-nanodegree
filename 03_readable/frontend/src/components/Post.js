import React, { Component } from 'react';
import { timestampToString } from '../utils/helpers'
import './css/Post.css';

class Post extends Component {
  render() {
    const {post, displayFullContent} = this.props;

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
        <div className='postTitle'>{post.title}</div>
        <div className='postDate'>Published: {timestampToString(post.timestamp)}</div>
        <div className='postScore'>Score: {post.voteScore}</div>
      </div>
    )
  }
}

export default Post;

