import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './Post'
import { fetchPosts } from '../utils/api';
import { loadPosts, sortPostsBy, filterPostsByCategory} from '../actions'
import './css/Posts.css';

class Posts extends Component {
  componentDidMount() {
    fetchPosts().then(posts => {
      this.props.loadPosts(posts);
    });
  }

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
  posts: state.posts ? state.posts: [],
  sortedBy: state.sortedBy
});

const mapDispatchToProps = dispatch => ({
  loadPosts: posts => dispatch(loadPosts(posts)),
  sortPostsBy: field => dispatch(sortPostsBy(field)),
  filterPostsByCategory: category => dispatch(filterPostsByCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
