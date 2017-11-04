import React from 'react'
import './css/SortPostsBy.css';

export default function SortPostsBy () {
  const SORT_BY = {voteScore: 'voteScore', timestampp: 'timestampp'};

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
