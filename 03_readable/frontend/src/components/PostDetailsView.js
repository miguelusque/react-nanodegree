import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PostDetails from './PostDetails';
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  static propTypes = {
    onClose: PropTypes.func
  };

  state = {
    editable: false
  };


  onEditHandler = () => {
    this.setState({editable: true});
  }

  onEditedHandler = (post) => {
    // Initialize voteScore after edition
    // This is not requested in project, but usual in real life
    // (Readers have voted for a different version of the post)
    post = {...post,
      voteScore: 0,
      timestamp: Date.now()
    }

    console.log(post);

    this.props.onClose();
  }

  render() {
    const { editable } = this.state;
    const { post } = this.props;

    return (
      <div className='postDetailsViewContainer'>
          <div className="postDetailsViewToolBar">
            <MdEdit className='postDetailsViewEditButton' onClick={this.onEditHandler}/><MdDelete className='postDetailsViewDeleteButton'/>
          </div>
          <PostDetails post={post} editable={editable} onEdited={this.onEditedHandler}/>
      </div>
    );
  }
}

export default PostDetailsView;
