import React, { Component } from 'react';
import Posts from './Posts';
import SortPostsBy from './SortPostsBy';
import MdClear from 'react-icons/lib/md/clear'

import './css/CategoriesView.css';

class CategoriesView extends Component {
  render() {
    const { posts, category } = this.props

    return (
      <div className='categoriesViewContainer'>
        <div className='categoriesContainer'>
          <h3 className='categoriesHeader'>Filtered by </h3>
          <span className='selectedCategoryName'>{category}</span>
          <button className='categoriesClearButton'>
            <MdClear className='categoriesClear'/>
          </button>
        </div>
        <SortPostsBy/>
        <Posts posts={posts}/>
      </div>
    );
  }
}

export default CategoriesView;
