import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost } from '../actions';
import { updatePost as updatePostServer } from '../utils/api';
import { timestampToString } from '../utils/helpers';
import './css/PostDetails.css';

class PostDetails extends Component {
  static defaultProps = {
    post: {},
    editable: false
  };

  static propTypes = {
    editable: PropTypes.bool,
    onSaved: PropTypes.func,
    post: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      post: props.post
    };
  }

  onSaveHandler = () => {
    const {updatePost, onSaved} = this.props;
    const {post} = this.state;

    const updatedFields = {
      id: post.id,
      title: post.title,
      body: post.body
    };

    // Update the post on both server and local
    updatePostServer(updatedFields)
      .then(updatePost(updatedFields))
      .then(onSaved);
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
        <div>
          <span className='postDetailsCategory'>#{post.category}</span>
          <span className='postDetailsScore'> ({post.voteScore} {Math.abs(post.voteScore) === 1 ? 'vote': 'votes'}).</span>
        </div>
        <div className='postDetailsDate'> {timestampToString(post.timestamp)}</div>
        { editable &&
          <div className='postDetailsSave'>
            <button onClick={this.onSaveHandler}>Save</button>
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updatePost: updatedFields => dispatch(updatePost(updatedFields))
});

export default connect(null, mapDispatchToProps)(PostDetails);

// TODO: componentWillReceiveProps(nextProps)
// In this project there is no use case where it might be needed to
// double check any change in props.post. I will implement a better
// solution after finishing this nanodegree.  :-)
