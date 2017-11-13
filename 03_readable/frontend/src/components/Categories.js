import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterPostsBy} from '../actions';
import MdClear from 'react-icons/lib/md/clear';
import './css/Categories.css';

class Categories extends Component {
  render() {
    const {categories, filteredBy, filterPostsBy} = this.props;

    return (
      <Switch>
        <Route exact path="/" render={ () => (
          <div className='categoriesContainer'>
            <h3 className='categoriesHeader'>Categories</h3>
            <ul className='categoryNames'>
              { categories.map((category) => (
                  <li className='categoryName' key={category.path}>
                    <Link className="categoryLink" to={`/${category.path}`} onClick={() => filterPostsBy(category.path)}> {category.name}</Link>
                  </li>
              ))}
            </ul>
          </div>
        )}/>
        <Route exact path="/:category" render={() => (
          <div className='categoriesContainer'>
            <h3 className='categoriesHeader'>Filtered by</h3>
            <span className='selectedCategoryName'>{filteredBy}</span>
            <Link className="categoryLink" to="/" onClick={() => filterPostsBy('')}>
              <button className='categoriesClearButton' >
                <MdClear className='categoriesClear'/>
              </button>
            </Link>
          </div>
        )}/>
      </Switch>
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
