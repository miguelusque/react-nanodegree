import React, { Component } from 'react';
import Posts from './Posts';
import Categories from './Categories';
import {SORT_BY, SortPostsBy} from './SortPostsBy';

import './css/PostsView.css';

class PostsView extends Component {
  state = {
    sortBy: SORT_BY.voteScore
  }

  render() {
    const { sortBy } = this.state;
    const { categories, posts } = this.props

    return (
      <div className='postsViewContainer'>
        <Categories
          categories={categories}
/*          onSelect={(category) => {filterPostsByCategoryRequest(category)}}
*/
        />
        <SortPostsBy/>
        <Posts posts={posts}/>
      </div>
    );
  }
}


export default PostsView;
