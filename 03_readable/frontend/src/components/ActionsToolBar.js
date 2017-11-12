import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';
import './css/ActionsToolBar.css';

class ActionsToolBar extends Component {
  static propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  };

  render() {
    const {onEdit, onDelete} = this.props;

    return (
      <div className='actionsToolBar' unselectable="on">
        <MdEdit className='actionsToolBarEditButton' onClick={onEdit}/>
        <MdDelete className='actionsToolBarDeleteButton' onClick={onDelete}/>
      </div>
    )
  }
}

export default ActionsToolBar;
