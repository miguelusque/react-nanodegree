import React from 'react'
import './SortPostsBy.css';

const SORT_BY = {voteScore: 'voteScore', timestampp: 'timestampp'};

function SortPostsBy () {
  return (
    <div className='sortPostsByContainer'>
      <h3 className='sortPostsByHeader'>Sort by:</h3>
      <ul className='sortPostsByFields'>
        <li className='sortPostsByField'>{SORT_BY.voteScore}</li>
        <li className='sortPostsByField'>{SORT_BY.timestampp}</li>
      </ul>
    </div>
  )
}

export {
  SORT_BY,
  SortPostsBy
}
