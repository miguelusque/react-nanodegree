import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadComments as loadCommentsServer } from '../utils/api';

import Comment from './Comment';
import './css/Comments.css';

class Comments extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  state = {
    comments: []
  };

  componentDidMount() {
    const {postId} = this.props;

    // Load comments from server
    loadCommentsServer(postId).then((comments) => {
      this.setState({comments});
    });
  }

  render() {
    let {comments} = this.state;

    // Sort comments by voteScore asc
    comments.sort((a,b) => b.voteScore - a.voteScore);

    return comments.length > 0
      ?
        <div className='commentsContainer'>
          <h3 className='commentsHeader'>{comments.length} {comments.length !== 1 ? 'comments' : 'comment'}</h3>
          { comments.map(comment => (<Comment comment={comment} key={comment.id} />)) }
        </div>
      :
        <div className='commentsNoResultsFound'>No comments yet.</div>
  }
}

export default Comments;
