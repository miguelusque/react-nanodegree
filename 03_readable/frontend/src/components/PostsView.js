import React, { Component } from 'react';
import Posts from './Posts';
import Categories from './Categories';
import SortPostsBy from './SortPostsBy';
import './css/PostsView.css';

class PostsView extends Component {
  render() {
    return (
      <div className='postsViewContainer'>
        <Categories/>
        <SortPostsBy/>
        <Posts/>
      </div>
    );
  }
}

export default PostsView;
