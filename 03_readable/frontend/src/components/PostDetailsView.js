import React, { Component } from 'react';
import MdEdit from 'react-icons/lib/md/edit'
import MdDelete from 'react-icons/lib/md/delete'
import PropTypes from 'prop-types'
import PostDetails from './PostDetails'
import './css/PostDetailsView.css';

class PostDetailsView extends Component {
  static defaultProps = {
    post: []
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  }

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
    const {post} = this.props;

    return (
      <div className='postDetailsViewContainer'>
        <div className="postDetailsViewToolBar">
          <MdEdit className='postDetailsViewEditButton' onClick={this.onEditHandler}/><MdDelete className='postDetailsViewDeleteButton'/>
        </div>
        <PostDetails post={post} editable={editable} onSaved={this.onSavedHandler}/>
      </div>
    );
  }
}

export default PostDetailsView;
