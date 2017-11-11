import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';
import './css/PostActionsToolBar.css';

class PostActionsToolBar extends Component {
  static propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  }

  render() {
    const {onEdit, onDelete} = this.props;

    return (
      <div className='postActionsToolBar' unselectable="on">
        <MdEdit className='postActionsToolBarEditButton' onClick={onEdit}/>
        <MdDelete className='postActionsToolBarDeleteButton' onClick={onDelete}/>
      </div>
    )
  }
}

export default PostActionsToolBar;
