import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToString } from '../utils/helpers';
import { updateComment as updateCommentServer,
  updateCommentVoteScore as updateCommentVoteScoreServer } from '../utils/api';
import ActionsToolBar from './ActionsToolBar'
import ThumbsToolBar from './ThumbsToolBar';
import './css/Comment.css';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    voteScore: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment,
      voteScore: undefined
    };
  }

  // This method updates the voteScore of a comment.
  // Please notice that the comments are not resorted automatically
  // when the voteScore changes. I have decided the application should
  // behive like that to avoid 'redrawing' the post details interface
  // while the user is voting on the comments.
  updateVoteScore = option => {
    const {comment, voteScore} = this.state;

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

  // This method handles the onSave edit event
  onSaveHandler = () => {
    const {comment} = this.state;

    const updatedFields = {
      body: comment.body,
      timestamp: comment.timestamp
    };

    // Update the comment on both server and local
    updateCommentServer(comment.id, updatedFields)
      .then(this.setState({editable: false, updatedFields: updatedFields}));  // Store in state to be used when cancelling edition
  }

  // This method handles the onCancel edit event
  onCancelHandler = () => {
    this.setState(
      { editable: false,
        comment: this.state.updatedFields
          ? {...this.state.comment, ...this.state.updatedFields}
          : {...this.props.comment}
      });
  }

  render() {
    const {comment, voteScore, editable} = this.state;

    return (
      <div className='commentContainer'>
        <ActionsToolBar
          onEdit={() => this.setState({editable: true})}
          onDelete={this.props.onDelete}
        />
        { editable ?
          <div>
            <div>Comment</div>
            <textarea className='commentBodyInput' type='text' value={comment.body}
              onChange={(e) => {this.setState(
                {comment: {...comment, body: e.target.value, timestamp:Date.now()}})}}/>
          </div>
        :
          <div>
            <div className='commentBody'>{comment.body}</div>
          </div>
        }
        <div className='commentAuthorTitle'>Added by <span className='commentAuthor'>{comment.author}</span>.</div>
        <div className='commentDate'>Published: {timestampToString(comment.timestamp)}</div>
        <div className='commentScore'>Score: {Math.abs(voteScore) >= 0 ? voteScore: comment.voteScore}</div>
        <ThumbsToolBar
          onThumbUpClick={() => { this.updateVoteScore(UP_VOTE); }}
          onThumbDownClick={() => { this.updateVoteScore(DOWN_VOTE); }}
        />
        { editable &&
          <div className='commentButtons'>
            <button className='commentButton' onClick={this.onCancelHandler}>Cancel</button>
            <button className='commentButton' onClick={this.onSaveHandler}>Save</button>
          </div>
        }
      </div>
    )
  }
}

export default Comment;
