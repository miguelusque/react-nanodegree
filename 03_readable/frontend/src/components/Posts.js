import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Post from './Post';
import PostDetailsView from './PostDetailsView';
import ActionsToolBar from './ActionsToolBar'
import NewPost from './NewPost'
import { deletePost } from '../actions';
import { deletePost as deletePostServer} from '../utils/api';
import './css/Posts.css';

class Posts extends Component {
  state = {
    postDetailsModalOpened: false,
    newPostModalOpened: false,
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

  closeNewPostModal = () => {
    this.setState({newPostModalOpened: false});

  }

  onSavedHandler = () => {
    this.closeNewPostModal();
  }

  render() {
    const {posts, categories} = this.props;
    const {postDetailsModalOpened, newPostModalOpened, selectedPost, editable} = this.state;

    return (
      <div className='postsContainer'>
        <span className='addNewPost' onClick={() => this.setState({newPostModalOpened:true})}>Add new post</span>
        <h3 className='postsHeader'>Posts</h3>
        { posts.length > 0
          ?
            posts.map(post => (
              <div key={post.id}>
                <ActionsToolBar
                  key={post.id}
                  onEdit={() => this.openPostDetailsModal(post, true)}
                  onDelete={() => this.onDeleteHandler(post.id)}
                />
                <Post post={post} onPostClick={() => this.openPostDetailsModal(post, false)}/>
              </div>
            ))
          :
          <div className='postsNoResultsFound'>No results found.</div>
        }

        <Route path="/" render={ ({history}) => (
          <Modal
            className='postDetailsModal'
            overlayClassName='postDetailsOverlay'
            isOpen={postDetailsModalOpened}
            onRequestClose={() => {history.goBack(); this.closePostDetailsModal()}}
            contentLabel='Post details'>
            <div>
              <PostDetailsView post={selectedPost} editable={editable}/>
            </div>
          </Modal>
        )}/>

        <Modal
          className='newPostModal'
          overlayClassName='newPostOverlay'
          isOpen={newPostModalOpened}
          onRequestClose={this.closeNewPostModal}
          contentLabel='Add new post'>
          <div>
            <NewPost categories={categories} onCanceled={this.closeNewPostModal} onSaved={this.onSavedHandler}/>
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
