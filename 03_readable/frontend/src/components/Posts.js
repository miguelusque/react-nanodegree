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

  componentWillReceiveProps(props) {
    const {category, postId } = props.match.params;

    // Display post details when navigation is performed by bookmarked pages.
    if (category && postId) {
      const post = props.posts.filter((post) => post.id === postId)[0];
      if (post) {
        this.openPostDetailsModal(post, false)
      }
    }
  }

  openPostDetailsModal = (post, editable) => {
    this.setState({postDetailsModalOpened: true, selectedPost: post, editable: editable});
  };

  closePostDetailsModal = () => {
    const { history, filteredBy } = this.props;
    this.setState({postDetailsModalOpened: false});
    history.push(`/${filteredBy}`);
  };

  onDeleteHandler = (postId) => {
    const {deletePost} = this.props;

    // Delete the post on both server and local
    deletePostServer(postId)
      .then(deletePost(postId));
  };

  closeNewPostModal = () => {
    this.setState({newPostModalOpened: false});
  };

  onSavedHandler = () => {
    this.closeNewPostModal();
  };

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

        <Route exact path="/:category/:postId" render={(props) => (
          <Modal
            className='postDetailsModal'
            overlayClassName='postDetailsOverlay'
            isOpen={postDetailsModalOpened}
            onRequestClose={() => {this.closePostDetailsModal()}}
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
  posts: state.posts,
  filteredBy: state.filteredBy
});

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
