import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';
import PropTypes from 'prop-types';
import { deletePost } from '../actions';
import { deletePost as deletePostServer} from '../utils/api';
import PostDetails from './PostDetails';
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  static defaultProps = {
    post: []
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  state = {
    editable: false,
    deleted: false
  };

  onDeleteHandler = () => {
    const {post, deletePost} = this.props;

    // Delete the post on both server and local
    deletePostServer(post.id)
      .then(deletePost(post.id))
      .then(this.setState({deleted: true}))
      .catch( () => {console.log("Error")});
  };

  render() {
    const {editable, deleted} = this.state;
    const {post} = this.props;

    return (
      <div className='postDetailsViewContainer'>
        <div className="postDetailsViewToolBar">
          <MdEdit className='postDetailsViewEditButton' onClick={() => { this.setState({editable: true}); }}/>
          <MdDelete className='postDetailsViewDeleteButton' onClick={this.onDeleteHandler}/>
        </div>
        { deleted ?
          <span>This post has been sucessfully deleted</span>
        :
        <PostDetails post={post} editable={editable} onSaved={() => {this.setState({editable: false});}}/>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(null, mapDispatchToProps)(PostDetailsView);
