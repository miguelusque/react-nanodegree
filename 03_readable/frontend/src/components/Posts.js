import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { selectPost } from '../actions'
import Post from './Post'
import PostDetailsView from './PostDetailsView'
import './css/Posts.css';

class Posts extends Component {
  state = {
    postDetailsModalOpened: false
  }

  openPostDetailsModal = (post) => {
    this.props.selectPost(post);
    this.setState({postDetailsModalOpened: true});
  }

  closePostDetailsModal = () => {
    this.setState({postDetailsModalOpened: false});
	}

  render() {
    const {posts} = this.props;
    const {postDetailsModalOpened} = this.state;

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
            <PostDetailsView/>
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
  selectPost: selectedPost => dispatch(selectPost(selectedPost))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
