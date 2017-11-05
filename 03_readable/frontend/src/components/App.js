import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../utils/api';
import { loadPosts } from '../actions'
import PostsView from './PostsView'
import CategoriesView from './CategoriesView'
import './css/App.css';

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount')
    fetchPosts().then(posts => {
      this.props.loadPosts(posts);
    });
  }

  render() {
    const { filteredBy } = this.props;

    return (
      <div className='pageContainer'>
        <header>
          <h1 className='pageTitle'>Readable</h1>
        </header>
        { filteredBy === '' ?
            <PostsView/>
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
