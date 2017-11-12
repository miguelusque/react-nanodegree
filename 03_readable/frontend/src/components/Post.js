import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils/helpers';
import { updatePostVoteScore } from '../actions';
import { updatePostVoteScore as updatePostVoteScoreServer } from '../utils/api';
import ThumbsToolBar from './ThumbsToolBar';
import './css/Post.css';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onPostClick: PropTypes.func
  };

  // This method updates the voteScore of a post
  updateVoteScore = option => {
    const {post, updatePostVoteScore} = this.props;

    let step;
    switch(option) {
      case DOWN_VOTE:
        step = -1;
        break;
      case UP_VOTE:
        step = 1;
        break;
      default:
        step = 0;
    }

    //Update the post's voteScore on both server and local
    updatePostVoteScoreServer(post.id, {option: option})
      .then(updatePostVoteScore(post.id, post.voteScore + step));
  };


  render() {
    const {post, onPostClick} = this.props;

    return (
      <div className='postContainer'>
        <div className='postTitle'>
          <span className='postTitleClickable' onClick={() => onPostClick && onPostClick(post.id)} >{post.title}</span>
        </div>
        <div className='postAuthorTitle'>Posted by <span className='postAuthor'>{post.author}</span>.</div>
        <div className='postDate'>Published: {timestampToString(post.timestamp)}</div>
        <div className='postCommentCount'>{post.commentCount} {post.commentCount !== 1 ? 'comments' : 'comment'}</div>
        <div className='postScore'>Score: {post.voteScore}</div>
        <ThumbsToolBar
          onThumbUpClick={() => { this.updateVoteScore(UP_VOTE); }}
          onThumbDownClick={() => { this.updateVoteScore(DOWN_VOTE); }}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updatePostVoteScore: (postId, voteScore) => dispatch(updatePostVoteScore(postId, voteScore))
});

export default connect(null, mapDispatchToProps)(Post);
