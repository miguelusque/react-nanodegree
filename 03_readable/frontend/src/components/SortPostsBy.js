import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sortPostsBy } from '../actions'

import './css/SortPostsBy.css';

export const SORTABLE_FIELDS = {score: 'voteScore', date: 'timestamp'};

class SortPostsBy extends Component {
  render () {
    const {sortPostsBy, sortedBy} = this.props;

    return <div className='sortPostsByContainer'>
      <h3 className='sortPostsByHeader'>Sorted by</h3>
      <ul className='sortPostsByFields'>
        {Object.keys(SORTABLE_FIELDS).map(field => (sortedBy === SORTABLE_FIELDS[field]
          ?
            <li className='sortPostsBySelectedField'
              key={field}>{field}
            </li>
          :
            <li className='sortPostsByField'
              key={field}
              onClick={() => sortPostsBy(SORTABLE_FIELDS[field])}>{field}
            </li>
        ))}
      </ul>
    </div>
  }
}

const mapStateToProps = (state) => ({
  sortedBy: state.sortedBy
});

const mapDispatchToProps = dispatch => ({
  sortPostsBy: field => dispatch(sortPostsBy(field))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortPostsBy);
