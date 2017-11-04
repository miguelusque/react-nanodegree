import React from 'react'
import './css/Categories.css';

export default function Categories ({ categories = [], onSelect }) {
  return (
    <div className='categoriesContainer'>
      <h3 className='categoriesHeader'>Categories</h3>
        <ul className='categoryNames'>
        {categories.map((category) => (
          <li className='categoryName' onClick={() => onSelect(category)} key={category.path}>{category.name}</li>
        ))}
        </ul>
    </div>
  )
}
