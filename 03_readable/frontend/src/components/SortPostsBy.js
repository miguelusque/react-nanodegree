import React from 'react'
import { SORT_BY } from '../actions/index'
import './css/SortPostsBy.css';

export default function SortPostsBy () {
  return (
    <div className='sortPostsByContainer'>
      <h3 className='sortPostsByHeader'>Sort by</h3>
      <ul className='sortPostsByFields'>
        <li className='sortPostsByField'>{SORT_BY.voteScore}</li>
        <li className='sortPostsByField'>{SORT_BY.timestampp}</li>
      </ul>
    </div>
  )
}
