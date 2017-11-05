import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './Post'
import './css/Posts.css';

class Posts extends Component {
  render() {
    const {posts, displayFullContent} = this.props;

    return (
      <div className='postsContainer'>
        <h3 className='postsHeader'>Posts</h3>
        {posts.map(post => (
          <Post post={post} displayFullContent={displayFullContent} key={post.id} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts ? state.posts: []
});

export default connect(mapStateToProps)(Posts);
