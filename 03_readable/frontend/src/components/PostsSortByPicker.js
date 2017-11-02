import React from 'react'
import './PostsSortByPicker.css';

const SORT_BY = {voteScore: 'voteScore', timestampp: 'timestampp'};

function PostsSortByPicker () {
  return (
    <div className='postsSortByPickerContainer'>
      <h3 className='postsSortByPickerHeader'>Sort by:</h3>
      <span className='postsSortByPickerMethod'>{SORT_BY.voteScore}</span>
      <span className='postsSortByPickerMethod'>{SORT_BY.timestampp}</span>
    </div>
  )
}

export {
  SORT_BY,
  PostsSortByPicker
}
