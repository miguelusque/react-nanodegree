import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updatePost } from '../actions'
import { putUpdatedPost } from '../utils/api';
import { timestampToString } from '../utils/helpers'
import './css/PostDetails.css';

class PostDetails extends Component {
  static propTypes = {
    editable: PropTypes.bool,
    onSaved: PropTypes.func
  }

  onSaveHandler = () => {
    const {updatePost, onSaved} = this.props;

    const updatedFields = {
      id: this.props.selectedPost.id,
      title: this.title.value,
      body: this.body.value
    };

    // Update content on server
    putUpdatedPost(updatedFields)
      .then(updatePost(updatedFields))
      .then(onSaved);
  }

  render() {
    const {editable, selectedPost} = this.props;

    return (
      <div className='postDetailsContainer'>
        { editable ?
          <div>
            <div>
              <div>Title</div>
              <div className='paddedInput'>
                <input className='postDetailsTitleInput' defaultValue={selectedPost.title} ref={(title) => this.title = title}/>
              </div>
            </div>

            <div>
              <div>Content</div>
              <textarea className='postDetailsBodyInput' type='text' defaultValue={selectedPost.body} ref={(body) => this.body = body}/>
            </div>
          </div>
          :
          <div>
            <div className='postDetailsTitle'>{selectedPost.title}</div>
            <div className='postDetailsBody'>{selectedPost.body}</div>
          </div>
        }
        <div className='postDetailsAuthorTitle'>Posted by <span className='postDetailsAuthor'>{selectedPost.author}</span>.</div>
        <div>
          <span className='postDetailsCategory'>#{selectedPost.category}</span>
          <span className='postDetailsScore'> ({selectedPost.voteScore} {Math.abs(selectedPost.voteScore) === 1 ? 'vote': 'votes'}).</span>
        </div>
        <div className='postDetailsDate'> {timestampToString(selectedPost.timestamp)}</div>
        { editable &&
          <div className='postDetailsSave'>
            <button onClick={this.onSaveHandler}>Save</button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPost: state.selectedPost
});

const mapDispatchToProps = dispatch => ({
  updatePost: updatedFields => dispatch(updatePost(updatedFields))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
