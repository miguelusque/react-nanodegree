import React, { Component } from 'react';
import * as ReadableAPI from '../utils/api';
import PostsView from './PostsView'

import './css/App.css';

class App extends Component {
  state = {
    posts: [],
    categories: []
  };

  componentDidMount() {
    ReadableAPI.fetchPosts().then((posts) => {
      this.setState({posts:posts});
    });

    ReadableAPI.fetchCategories().then((categories) => {
      this.setState(categories);
    });

  }

  render() {
    const { posts, categories } = this.state;

    return (
      <div className='pageContainer'>
        <header>
          <h1 className='pageTitle'>Readable</h1>
        </header>
        <PostsView posts={posts} categories={categories}/>
      </div>
    );
  }
}

export default App;
