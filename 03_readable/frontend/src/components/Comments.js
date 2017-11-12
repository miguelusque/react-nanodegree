import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCommentCount } from '../actions';
import { loadComments as loadCommentsServer, deleteComment as deleteCommentServer } from '../utils/api';
import Comment from './Comment';
import NewComment from './NewComment';
import './css/Comments.css';

class Comments extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  };

  state = {
    comments: [],
    newCommentModalOpened: false,

  };

  componentDidMount() {
    const {postId} = this.props;

    // Load comments from server
    loadCommentsServer(postId).then((comments) => {
      this.setState({comments});
    });
  }

  // This method updates the comment count in local
  onSavedHandler = (comment) => {
    const {updateCommentCount, postId} = this.props;
    const {comments} = this.state;

    updateCommentCount(postId, comments.length + 1);
    this.setState({comments: [...comments, comment], newCommentModalOpened: false});
  };

  // This method deletes a comment ob both server and local
  onDeleteHandler = (commentId, parentId) => {
    const {updateCommentCount} = this.props;
    const {comments} = this.state;

    // Delete the comment on both server and local
    deleteCommentServer(commentId)
      .then(updateCommentCount(parentId, comments.length - 1))
      .then(this.setState({comments: comments.filter(comment => comment.id !== commentId)}));
  };

  render() {
    const {postId} = this.props;
    let {comments, newCommentModalOpened} = this.state;

    // Sort comments by timestamp asc
    comments.sort((a,b) => b.timestamp - a.timestamp);

    return (
      <div className='commentsContainer'>
        <span className='addNewComment' onClick={() => this.setState({newCommentModalOpened:true})}>Add new comment</span>
        <h3 className='commentsHeader'>{comments.length} {comments.length !== 1 ? 'comments' : 'comment'}</h3>
        { newCommentModalOpened &&
          <NewComment parentId={postId}
            onCanceled={() => this.setState({newCommentModalOpened: false})}
            onSaved={this.onSavedHandler}
            /> }
        <div className='commentsList'>
        { comments.length > 0
          ?
            comments.map(comment => (
              <Comment comment={comment} key={comment.id} onDelete={() => this.onDeleteHandler(comment.id, comment.parentId)}/>
            ))
          :
            <div className='commentsNoResultsFound'>No comments yet.</div>
        }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCommentCount: (parentId, commentCount) => dispatch(updateCommentCount(parentId, commentCount))
});

export default connect(null, mapDispatchToProps)(Comments);
