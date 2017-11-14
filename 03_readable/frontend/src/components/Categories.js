import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterPostsBy} from '../actions';
import MdClear from 'react-icons/lib/md/clear';
import './css/Categories.css';

class Categories extends Component {
  state = {
    bookmarked: undefined
  };

  componentWillReceiveProps(props) {
    const {category } = props.match.params;

    // Filter posts by category when navigating by url
    if (this.state.bookmarked === undefined && category) {
        this.setState({bookmarked: true});
        props.filterPostsBy(category);
    } else {
        this.setState({bookmarked: false});
    }
  }

  render() {
    return (
        this.props.filteredBy === ''
        ?
          <div className='categoriesContainer'>
            <h3 className='categoriesHeader'>Categories</h3>
            <ul className='categoryNames'>
              { this.props.categories.map((category) => (
                  <li className='categoryName' key={category.path}>
                    <Link className="categoryLink" to={`/${category.path}`}
                      onClick={() => this.props.filterPostsBy(category.path)}>{category.name}</Link>
                  </li>
              ))}
            </ul>
          </div>
        :
          <div className='categoriesContainer'>
            <h3 className='categoriesHeader'>Filtered by</h3>
            <span className='selectedCategoryName'>{this.props.match.params.category}</span>
            <Link className="categoryLink" to="/" onClick={() => this.props.filterPostsBy('')}>
              <button className='categoriesClearButton' >
                <MdClear className='categoriesClear'/>
              </button>
            </Link>
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
