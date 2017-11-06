import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { timestampToString } from '../utils/helpers'
import './css/PostDetails.css';

class PostDetails extends Component {
  static propTypes = {
    onEdit: PropTypes.func
  };

  onSaveHandler = () => {
    this.props.onEdited && this.props.onEdited({
      title: this.title.value,
      body: this.body.value,
      author: this.author.value,
      category: this.category.value
    });
  }

  render() {
    const {post, editable} = this.props;

    return (editable
      ?
        <div className='postDetailsContainer'>
          <div>
            <div>Title</div>
            <input className='postDetailsInput' defaultValue={post.title} ref={(title) => this.title = title}/>
          </div>
          <div>
            <div>Content</div>
            <textarea className='postDetailsInput' type='text' defaultValue={post.body} ref={(body) => this.body = body}/>
          </div>
          <div>
            <div>Author</div>
            <input className='postDetailsInput' type='text' defaultValue={post.author} ref={(author) => this.author = author}/>
          </div>
          <div>
            <div>Category</div>
            <input className='postDetailsInput' type='text' defaultValue={post.category} ref={(category) => this.category = category}/>
          </div>
          <div className='postDetailsScore'> ({post.voteScore} {Math.abs(post.voteScore) === 1 ? 'vote': 'votes'}).</div>
          <div className='postDetailsDate'> {timestampToString(post.timestamp)}</div>
          <div className='postDetailsSave'>
            <button onClick={this.onSaveHandler}>Save</button>
          </div>
        </div>
        :
        <div className='postDetailsContainer'>
            <div className='postDetailsTitle'>{post.title}</div>
            <div className='postDetailsBody'>{post.body}</div>
            <div className='postDetailsAuthorTitle'>Posted by <span className='postDetailsAuthor'>{post.author}</span>.</div>
            <div>
              <span className='postDetailsCategory'>#{post.category}</span>
              <span className='postDetailsScore'> ({post.voteScore} {Math.abs(post.voteScore) === 1 ? 'vote': 'votes'}).</span>
            </div>
            <div className='postDetailsDate'> {timestampToString(post.timestamp)}</div>
        </div>
    )
  }
}

export default PostDetails;
