import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadPosts as loadPostsServer, loadCategories as loadCategoriesServer } from '../utils/api';
import { loadPosts } from '../actions'
import PostsView from './PostsView'
import CategoriesView from './CategoriesView'
import './css/App.css';

class App extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    loadPostsServer().then(posts => {
      this.props.loadPosts(posts);
    });

    loadCategoriesServer().then((categories) => {
      this.setState(categories);
    });
  }

  render() {
    const { filteredBy } = this.props;
    const { categories } = this.state;

    return (
      <div className='pageContainer'>
        <header>
          <h1 className='pageTitle'>Readable</h1>
        </header>
        { filteredBy === '' ?
            <PostsView categories={categories}/>
          :
            <CategoriesView/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredBy: state.filteredBy
});

const mapDispatchToProps = dispatch => ({
  loadPosts: posts => dispatch(loadPosts(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
