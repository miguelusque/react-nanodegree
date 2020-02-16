import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import Posts from './Posts';
import Categories from './Categories';
import SortPostsBy from './SortPostsBy';
import './css/PostsView.css';

class PostsView extends Component {
  render() {
    const {categories} = this.props;

    return (
      <div className='postsViewContainer'>
        <Route path="/:category?/:postId?" render={(props) => (
          <Categories {...props} categories={categories}/>
        )}/>
        <SortPostsBy/>
        <Route path="/:category?/:postId?" render={(props) => (
          <Posts {...props} categories={categories}/>
        )}/>
      </div>
    );
  }
}

export default PostsView;
