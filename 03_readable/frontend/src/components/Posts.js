import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Post from './Post';
import PostDetailsView from './PostDetailsView';
import PostActionsToolBar from './PostActionsToolBar'
import { deletePost } from '../actions';
import { deletePost as deletePostServer} from '../utils/api';


import './css/Posts.css';

class Posts extends Component {
  state = {
    postDetailsModalOpened: false,
    selectedPost: {},
    editable: false
  }

  openPostDetailsModal = (post, editable) => {
    this.setState({postDetailsModalOpened: true, selectedPost: post, editable: editable});
  }

  closePostDetailsModal = () => {
    this.setState({postDetailsModalOpened: false});
  }

  onDeleteHandler = (postId) => {
    const {deletePost} = this.props;

    // Delete the post on both server and local
    deletePostServer(postId)
      .then(deletePost(postId));
  };

  render() {
    const {posts} = this.props;
    const {postDetailsModalOpened, selectedPost, editable} = this.state;

    return (
      <div className='postsContainer'>
        <h3 className='postsHeader'>Posts</h3>
        { posts.length > 0
          ?
            posts.map(post => (
              <div key={post.id}>
                <PostActionsToolBar
                  key={post.id}
                  onEdit={() => this.openPostDetailsModal(post, true)}
                  onDelete={() => this.onDeleteHandler(post.id)}
                />
                <Post post={post}  onPostClick={() => this.openPostDetailsModal(post, false)} />
              </div>
            ))
          :
          <div className='postsNoResultsFound'>No results found.</div>
        }

        <Modal
          className='postDetailsModal'
          overlayClassName='postDetailsOverlay'
          isOpen={postDetailsModalOpened}
          onRequestClose={this.closePostDetailsModal}
          contentLabel='Post details'>
          <div>
            <PostDetailsView post={selectedPost} editable={editable}/>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts ? state.posts: []
});

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
