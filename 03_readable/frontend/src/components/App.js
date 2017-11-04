import React, { Component } from 'react';
import PostsView from './PostsView'
import CategoriesView from './CategoriesView'
import './css/App.css';

class App extends Component {
  state = {
    filteredByCategory: false,
    category: ''
  };

  render() {
    const { filteredByCategory, category } = this.state;

    return (
      <div className='pageContainer'>
        <header>
          <h1 className='pageTitle'>Readable</h1>
        </header>
        { filteredByCategory ?
            <CategoriesView category={category}/>
          :
            <PostsView/>
        }
      </div>
    );
  }
}

export default App;
