import React from 'react'
import './css/SortPostsBy.css';

export const SORTABLE_FIELDS = {voteScore: 'voteScore', timestamp: 'timestamp'};

export default function SortPostsBy () {
  return (
    <div className='sortPostsByContainer'>
      <h3 className='sortPostsByHeader'>Sort by</h3>
      <ul className='sortPostsByFields'>
        <li className='sortPostsByField'>{SORTABLE_FIELDS.voteScore}</li>
        <li className='sortPostsByField'>{SORTABLE_FIELDS.timestamp}</li>
      </ul>
    </div>
  )
}
