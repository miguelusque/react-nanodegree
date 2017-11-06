import React, { Component } from 'react';
import PostDetails from './PostDetails';
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className='postDetailsViewContainer'>
          <div className="postDetailsViewToolBar">
            <MdEdit className='postDetailsViewEditButton'/><MdDelete className='postDetailsViewDeleteButton'/>
          </div>
          <PostDetails post={post}/>
      </div>
    );
  }
}

export default PostDetailsView;
