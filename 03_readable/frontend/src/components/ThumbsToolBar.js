import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdThumbUp from 'react-icons/lib/md/thumb-up';
import MdThumbDown from 'react-icons/lib/md/thumb-down';
import './css/ThumbsToolBar.css';

class ThumbsToolBar extends Component {
  static propTypes = {
    onThumbUpClick: PropTypes.func,
    onThumbDownClick: PropTypes.func
  };

  render() {
    const {onThumbUpClick, onThumbDownClick} = this.props;

    return (
      <div className='thumbsToolBar' unselectable="on">
        <MdThumbDown className='thumbButton' onClick={onThumbDownClick}/>
        <MdThumbUp className='thumbButton' onClick={onThumbUpClick}/>
      </div>
    )
  }
}

export default ThumbsToolBar;
