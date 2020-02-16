import React from 'react';
import PropTypes from 'prop-types';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';
import './css/ActionsToolBar.css';


const ActionsToolBar = ({onEdit, onDelete}) => (
  <div className='actionsToolBar' unselectable="on">
    <MdEdit className='actionsToolBarEditButton' onClick={onEdit}/>
    <MdDelete className='actionsToolBarDeleteButton' onClick={onDelete}/>
  </div>
);

ActionsToolBar.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default ActionsToolBar;
