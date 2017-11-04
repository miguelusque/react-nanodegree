import React from 'react'
import './css/SortPostsBy.css';

export const SORTABLE_FIELDS = {voteScore: 'voteScore', timestamp: 'timestamp'};

export default function SortPostsBy () {
  return (
    <div className='sortPostsByContainer'>
      <h3 className='sortPostsByHeader'>Sort by</h3>
      <ul className='sortPostsByFields'>
        {Object.keys(SORTABLE_FIELDS).map(field => (
          <li className='sortPostsByField' key={field}>{SORTABLE_FIELDS[field]}</li>
        ))}
      </ul>
    </div>
  )
}
