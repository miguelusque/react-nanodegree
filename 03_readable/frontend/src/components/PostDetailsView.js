import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePost } from '../actions';
import { deletePost as deletePostServer} from '../utils/api';
import PostDetails from './PostDetails';
import ActionsToolBar from './ActionsToolBar'
import Comments from './Comments';
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  static defaultProps = {
    post: []
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  // Initializa state with props
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      editable: props.editable
    }
  }

  onDeleteHandler = () => {
    const {post, deletePost} = this.props;

    // Delete the post on both server and local
    deletePostServer(post.id)
      .then(deletePost(post.id))
      .then(this.setState({deleted: true}));
  };

  render() {
    const {editable, deleted} = this.state;
    const {post} = this.props;

    return (
      <div className='postDetailsViewContainer'>
        <ActionsToolBar
          onEdit={() => this.setState({editable: true})}
          onDelete={this.onDeleteHandler}
        />
        { deleted ?
          <span>This post has been sucessfully deleted</span>
        :
          <div>
            <PostDetails post={post} editable={editable}
              onSaved={() => {this.setState({editable: false});}}
              onCancelled={() => {this.setState({editable: false});}}/>
            <Comments postId={post.id} />
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(null, mapDispatchToProps)(PostDetailsView);
