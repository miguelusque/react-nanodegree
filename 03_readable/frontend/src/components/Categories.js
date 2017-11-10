import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterPostsBy} from '../actions';
import MdClear from 'react-icons/lib/md/clear';
import './css/Categories.css';

class Categories extends Component {
  render() {
    const {categories, filteredBy, filterPostsBy} = this.props;

    return (filteredBy === ''
      ?
        <div className='categoriesContainer'>
          <h3 className='categoriesHeader'>Categories</h3>
          <ul className='categoryNames'>
            { categories.map((category) => (
              <li className='categoryName'
                key={category.path}
                onClick={() => filterPostsBy(category.path)}>{category.name}</li>
              ))
            }
          </ul>
        </div>
      :
        <div className='categoriesContainer'>
          <h3 className='categoriesHeader'>Filtered by</h3>
          <span className='selectedCategoryName'>{filteredBy}</span>
          <button className='categoriesClearButton' onClick={() => filterPostsBy('')}>
            <MdClear className='categoriesClear'/>
          </button>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredBy: state.filteredBy
});

const mapDispatchToProps = dispatch => ({
  filterPostsBy: category => dispatch(filterPostsBy(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
