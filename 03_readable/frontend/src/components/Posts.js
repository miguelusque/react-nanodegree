import React from 'react'
import { timestampToString } from '../utils/helpers'
import './Posts.css';

export default function Posts ({ posts = [] }) {
  // Sort posts by voteScore desc
  posts.sort((a,b) => b.voteScore - a.voteScore);
  posts = posts.sort();

  return (
    <div className='postsContainer'>
      <h3 className='postsHeader'>Posts</h3>
        {posts.map((post) => (
          <div className='postContainer' key={post.id}>
            <div className='postTitle'>{post.title}</div>
            <div className='postBody'>{post.body}</div>
            <div className='postDate'>Published: {timestampToString(post.timestamp)}</div>
            <div className='postAuthor'>Author: {post.author}</div>
            <div className='postCategory'>Category: {post.category}</div>
            <div className='postScore'>Score: {post.voteScore}</div>
          </div>
        ))}
    </div>
  )
}
