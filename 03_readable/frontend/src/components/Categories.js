import React, { Component } from 'react';
import { fetchCategories }  from '../utils/api';
import './css/Categories.css';

class Categories extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    fetchCategories().then((categories) => {
      this.setState(categories);
    });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className='categoriesContainer'>
        <h3 className='categoriesHeader'>Categories</h3>
          <ul className='categoryNames'>
          {categories.map((category) => (
            <li className='categoryName' key={category.path}>{category.name}</li>
          ))}
          </ul>
      </div>
    )
  }
}

export default Categories;
