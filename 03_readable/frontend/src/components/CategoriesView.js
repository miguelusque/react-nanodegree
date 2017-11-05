import React, { Component } from 'react';
import { connect } from 'react-redux'
import { filterPostsBy} from '../actions'
import Posts from './Posts';
import SortPostsBy from './SortPostsBy';
import MdClear from 'react-icons/lib/md/clear'
import './css/CategoriesView.css';

class CategoriesView extends Component {
  render() {
    const { filterPostsBy, filteredBy } = this.props

    return (
      <div className='categoriesViewContainer'>
        <div className='categoriesContainer'>
          <h3 className='categoriesHeader'>Filtered by </h3>
          <span className='selectedCategoryName'>{filteredBy}</span>
          <button className='categoriesClearButton' onClick={() => filterPostsBy('')}>
            <MdClear className='categoriesClear'/>
          </button>
        </div>
        <SortPostsBy/>
        <Posts/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);
