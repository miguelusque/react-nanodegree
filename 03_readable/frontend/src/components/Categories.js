import React, { Component } from 'react';
import { connect } from 'react-redux'
import { filterPostsBy} from '../actions'

import './css/Categories.css';

class Categories extends Component {
  render() {
    const {categories, filterPostsBy} = this.props;

    return (
      <div className='categoriesContainer'>
        <h3 className='categoriesHeader'>Categories</h3>
          <ul className='categoryNames'>
          {categories.map((category) => (
            <li className='categoryName'
            key={category.path}
            onClick={() => filterPostsBy(category.path)}>{category.name}</li>
          ))}
          </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  filterPostsBy: category => dispatch(filterPostsBy(category))
});

export default connect(null, mapDispatchToProps)(Categories);
