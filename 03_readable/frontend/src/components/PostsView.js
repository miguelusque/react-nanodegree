import React, { Component } from 'react';
import Posts from './Posts';
import Categories from './Categories';
import SortPostsBy from './SortPostsBy';

import './css/PostsView.css';

class PostsView extends Component {


  render() {
    const { categories } = this.props

    return (
      <div className='postsViewContainer'>
        <Categories
          categories={categories}
/*          onSelect={(category) => {filterPostsByCategoryRequest(category)}}
*/
        />
        <SortPostsBy/>
        <Posts/>
      </div>
    );
  }
}

export default PostsView;
