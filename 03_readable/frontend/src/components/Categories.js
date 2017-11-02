import React from 'react'
import './Categories.css';

export default function Categories ({ categories = [] }) {
  return (
    <div className='categoriesContainer'>
      <h3 className='categoriesHeader'>Categories</h3>
        {categories.map((category) => (
            <span className='categoryName' key={category.path}>{category.name}</span>
        ))}
    </div>
  )
}
