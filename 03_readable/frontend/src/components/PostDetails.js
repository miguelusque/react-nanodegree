import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost, updatePostVoteScore } from '../actions';
import { updatePost as updatePostServer, updatePostVoteScore as updatePostVoteScoreServer  } from '../utils/api';
import { timestampToString } from '../utils/helpers';
import ThumbsToolBar from './ThumbsToolBar';
import './css/PostDetails.css';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class PostDetails extends Component {
  static propTypes = {
    editable: PropTypes.bool,
    onSaved: PropTypes.func,
    onCancelled: PropTypes.func,
    post: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      post: props.post
    };
  }

  // This method updates the voteScore of a post
  updateVoteScore = option => {
    const {post} = this.state;

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
      .then(this.props.updatePostVoteScore(post.id, post.voteScore + step))
      .then(this.setState({post: {...post, voteScore: post.voteScore + step}}));
  };

  // This method handles the onSave edit event
  onSaveHandler = () => {
    const {post} = this.state;

    const updatedFields = {
      title: post.title,
      body: post.body
    };

    // Update the post on both server and local
    updatePostServer(post.id, updatedFields)
      .then(this.props.updatePost(post.id, updatedFields))
      .then(this.setState({updatedFields: updatedFields}))  // Store in state to be used when cancelling edition
      .then(this.props.onSaved);
  }

  // This method handles the onCancel edit event
  onCancelHandler = () => {
    this.setState(
      { post: this.state.updatedFields
          ? {...this.state.post, ...this.state.updatedFields}
          : {...this.props.post}
      });
    this.props.onCancelled();
  }

  render() {
    const {editable} = this.props;
    const {post} = this.state;

    return (
      <div className='postDetailsContainer'>
        { editable ?
          <div>
            <div>
              <div>Title</div>
              <div className='paddedInput'>
                <input className='postDetailsTitleInput' type='text' value={post.title}
                  onChange={(e) => {this.setState({post: {...post, title: e.target.value}})}}/>
              </div>
            </div>
            <div>
              <div>Content</div>
              <textarea className='postDetailsBodyInput' type='text' value={post.body}
                onChange={(e) => {this.setState({post: {...post, body: e.target.value}})}}/>
            </div>
          </div>
          :
          <div>
            <div className='postDetailsTitle'>{post.title}</div>
            <div className='postDetailsBody'>{post.body}</div>
          </div>
        }
        <div className='postDetailsAuthorTitle'>Posted by <span className='postDetailsAuthor'>{post.author}</span>.</div>
        <div className='postDetailsCategory'>#{post.category}</div>
        <div className='postDetailsDate'> {timestampToString(post.timestamp)}</div>
        <div className='postDetailsScore'>Score: {post.voteScore}</div>
        <ThumbsToolBar
          onThumbUpClick={() => { this.updateVoteScore(UP_VOTE); }}
          onThumbDownClick={() => { this.updateVoteScore(DOWN_VOTE); }}/>
        { editable &&
          <div className='postDetailsButtons'>
            <button className='postDetailsButton' onClick={this.onCancelHandler}>Cancel</button>
            <button className='postDetailsButton' onClick={this.onSaveHandler}>Save</button>
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updatePost: (postId, updatedFields) => dispatch(updatePost(postId, updatedFields)),
  updatePostVoteScore: (postId, voteScore) => dispatch(updatePostVoteScore(postId, voteScore))

});

export default connect(null, mapDispatchToProps)(PostDetails);

// TODO: componentWillReceiveProps(nextProps)
// In this project there is no use case where it might be needed to
// double check any change in props.post. I will implement a better
// solution after finishing this nanodegree.  :-)
