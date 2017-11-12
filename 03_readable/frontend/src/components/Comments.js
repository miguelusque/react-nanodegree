import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../actions';
import { loadComments as loadCommentsServer, deleteComment as deleteCommentServer } from '../utils/api';
import Comment from './Comment';
import './css/Comments.css';

class Comments extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  };

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

  onDeleteHandler = (commentId, parentId) => {
    const {deleteComment} = this.props;
    const {comments} = this.state;

    // Delete the comment on both server and local
    deleteCommentServer(commentId)
      .then(deleteComment(parentId, comments.length - 1))
      .then(this.setState({comments: comments.filter(comment => comment.id !== commentId)}));
  };

  render() {
    let {comments} = this.state;

    // Sort comments by voteScore asc
    comments.sort((a,b) => b.voteScore - a.voteScore);

    return comments.length > 0
      ?
        <div className='commentsContainer'>
          <h3 className='commentsHeader'>{comments.length} {comments.length !== 1 ? 'comments' : 'comment'}</h3>
          { comments.map(comment => (<Comment comment={comment} key={comment.id} onDelete={() => this.onDeleteHandler(comment.id, comment.parentId)}/>)) }
        </div>
      :
        <div className='commentsNoResultsFound'>No comments yet.</div>
  }
}

const mapDispatchToProps = dispatch => ({
  deleteComment: (parentId, commentCount) => dispatch(deleteComment(parentId, commentCount))
});

export default connect(null, mapDispatchToProps)(Comments);
