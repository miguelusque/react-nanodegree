import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../utils/api';
import PostsView from './PostsView'
import CategoriesView from './CategoriesView'
import { loadPosts } from '../actions'

import './css/App.css';

class App extends Component {
  state = {
    posts: [],
    filteredByCategory: false,
    category: 'react'
  };

  componentDidMount() {
    fetchPosts().then((posts) => {
      this.props.loadPosts(posts);
    });
  }

  render() {
    const { filteredByCategory, category } = this.state;

    return (
      <div className='pageContainer'>
        <header>
          <h1 className='pageTitle'>Readable</h1>
        </header>
        { filteredByCategory
          ?
            <CategoriesView category={category}/>
          :
            <PostsView />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  loadPosts: (posts) => dispatch(loadPosts(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
