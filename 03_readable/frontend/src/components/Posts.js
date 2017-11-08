import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Post from './Post'
import PostDetailsView from './PostDetailsView'
import './css/Posts.css';

class Posts extends Component {
  state = {
    postDetailsModalOpened: false,
    selectedPost: {}
  }

  openPostDetailsModal = (post) => {
    this.setState({postDetailsModalOpened: true, selectedPost: post});
  }

  closePostDetailsModal = () => {
    this.setState({postDetailsModalOpened: false});
	}

  render() {
    const {posts} = this.props;
    const {postDetailsModalOpened, selectedPost} = this.state;

    return (
      <div className='postsContainer'>
        <h3 className='postsHeader'>Posts</h3>
        { posts.length > 0
          ?
            posts.map(post => (
              <Post post={post} key={post.id} onPostClick={() => this.openPostDetailsModal(post)} />
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
            <PostDetailsView post={selectedPost}/>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts ? state.posts: []
});

export default connect(mapStateToProps)(Posts);
