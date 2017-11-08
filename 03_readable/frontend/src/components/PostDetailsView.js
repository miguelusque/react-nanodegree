import React, { Component } from 'react';
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import PostDetails from './PostDetails'
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  state = {
    editable: false
  };

  onEditHandler = () => {
    this.setState({editable: true});
  }

  onSavedHandler = () => {
    this.setState({editable: false});
  }

  render() {
    const {editable} = this.state;

    return (
      <div className='postDetailsViewContainer'>
        <div className="postDetailsViewToolBar">
          <MdEdit className='postDetailsViewEditButton' onClick={this.onEditHandler}/><MdDelete className='postDetailsViewDeleteButton'/>
        </div>
        <PostDetails editable={editable} onSaved={this.onSavedHandler}/>
      </div>
    );
  }
}

export default PostDetailsView;
