import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updatePost } from '../actions'
import { putUpdatedPost } from '../utils/api';
import { timestampToString } from '../utils/helpers'
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  state = {
    editable: false
  };

  onEditHandler = () => {
    this.setState({editable: true});
  }

  onSaveHandler = () => {
    const {updatePost} = this.props;

    const updatedFields = {
      id: this.props.selectedPost.id,
      title: this.title.value,
      body: this.body.value
    };

    // Update content on server
    putUpdatedPost(updatedFields)
      .then(updatePost(updatedFields))
      .then(this.setState({editable: false})
    );
  }

  render() {
    const {editable} = this.state;
    const {selectedPost} = this.props;

    return (
      <div className='postDetailsViewContainer'>
        <div className="postDetailsViewToolBar">
          <MdEdit className='postDetailsViewEditButton' onClick={this.onEditHandler}/><MdDelete className='postDetailsViewDeleteButton'/>
        </div>
        { editable ?
            <div className='postDetailsContainer'>
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
              <div className='postDetailsAuthorTitle'>Posted by <span className='postDetailsAuthor'>{selectedPost.author}</span>.</div>
                <div>
                  <span className='postDetailsCategory'>#{selectedPost.category}</span>
                  <span className='postDetailsScore'> ({selectedPost.voteScore} {Math.abs(selectedPost.voteScore) === 1 ? 'vote': 'votes'}).</span>
                </div>
              <div className='postDetailsDate'> {timestampToString(selectedPost.timestamp)}</div>
              <div className='postDetailsSave'>
                <button onClick={this.onSaveHandler}>Save</button>
              </div>
            </div>
          :
            <div className='postDetailsContainer'>
              <div className='postDetailsTitle'>{selectedPost.title}</div>
              <div className='postDetailsBody'>{selectedPost.body}</div>
              <div className='postDetailsAuthorTitle'>Posted by <span className='postDetailsAuthor'>{selectedPost.author}</span>.</div>
              <div>
                <span className='postDetailsCategory'>#{selectedPost.category}</span>
                <span className='postDetailsScore'> ({selectedPost.voteScore} {Math.abs(selectedPost.voteScore) === 1 ? 'vote': 'votes'}).</span>
              </div>
              <div className='postDetailsDate'> {timestampToString(selectedPost.timestamp)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);
