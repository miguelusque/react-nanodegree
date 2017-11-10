import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils/helpers';
import { updateCommentVoteScore as updateCommentVoteScoreServer } from '../utils/api';
import MdThumbUp from 'react-icons/lib/md/thumb-up';
import MdThumbDown from 'react-icons/lib/md/thumb-down';
import './css/Comment.css';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    voteScore: PropTypes.number
  }

  state = {
    voteScore: undefined
  };

  updateVoteScore = option => {
    const {comment} = this.props;
    const {voteScore} = this.state;

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

    // Update the comment's voteScore on both server and local
    updateCommentVoteScoreServer(comment.id, {option: option})
      .then(this.setState({
        voteScore: Math.abs(voteScore) >= 0 ? voteScore + step: comment.voteScore + step
      })
    );
  };

  render() {
    const {comment} = this.props;
    const {voteScore} = this.state;

    return (
      <div className='commentContainer'>
        <div className='commentBody'>{comment.body}</div>
        <div className='commentAuthorTitle'>Added by <span className='commentAuthor'>{comment.author}</span>.</div>
        <div className='commentDate'>Published: {timestampToString(comment.timestamp)}</div>
        <div className='commentScore'>Score: {Math.abs(voteScore) >= 0 ? voteScore: comment.voteScore}</div>
        <div className='commentThumbsToolBar' unselectable="on">
          <MdThumbDown className='commentThumbButton' onClick={() => { this.updateVoteScore(DOWN_VOTE); }}/>
          <MdThumbUp className='commentThumbButton' onClick={() => { this.updateVoteScore(UP_VOTE); }}/>
        </div>
      </div>
    )
  }
}

export default Comment;
