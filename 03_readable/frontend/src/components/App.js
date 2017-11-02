import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/api';
import Posts from './Posts';
import Categories from './Categories';
import {SORT_BY, PostsSortByPicker} from './PostsSortByPicker';


import './App.css';

class App extends Component {  
  state = {
    categories: [],
    posts: [],
    sortBy: SORT_BY.voteScore
  }

  componentDidMount() {

    ReadableAPI.fetchPosts().then((posts) => {
      this.setState({posts:posts});
    });

    ReadableAPI.fetchCategories().then((categories) => {
      this.setState(categories);
    });

  }

  render() {
    const { categories, posts } = this.state;

    return (
      <div className='pageContainer'>
        <header>
          <h1 className='pageTitle'>Readable</h1>
        </header>
        <Categories categories={categories}/>
        <Posts posts={posts}/>
      </div>
    );
  }
}

export default App;
