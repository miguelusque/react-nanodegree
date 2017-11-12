import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost as addPostServer } from '../utils/api';
import { uuidv4 } from '../utils/helpers'
import { addPost } from '../actions';
import './css/NewPost.css';

class NewPost extends Component {
  static defaultProps = {
    categories: [],
    onCanceled: () => {}
  };

  static propTypes = {
    onSaved: PropTypes.func,
    onCanceled: PropTypes.func,
    categories: PropTypes.array
  };

  state = {
    saveDisabled : true
  };

  // This method handles the onSave event
  onSaveHandler = () => {
    const {categories} = this.props;

    const post = {
      id: uuidv4(),
      title: this.title ? this.title.value : '',
      body: this.body ? this.body.value : '',
      author: this.author ? this.author.value : '',
      category: this.category ? this.category : (categories.length > 0 ? categories[0].name : ''),
      timestamp: Date.now(),
      voteScore: 0
    };

    // Add the post on both server and local
    addPostServer(post)
      .then(this.props.addPost(post))
      .then(this.props.onSaved);
  }

  // This method handles the onCancel event
  onCancelHandler = () => this.props.onCanceled();

  render() {
    const {categories} = this.props;

    return (
      <div className='newPostContainer'>
        <label>Title</label>
        <div className='paddedInput'>
          <input className='newPostTitle' type='text' ref={(title) => this.title = title}/>
        </div>
        <label>Content</label>
        <textarea className='newPostBody' rows="10" type='text' ref={(body) => this.body = body}/>
        <label>Author</label>
        <div className='paddedInput'>
          <input className='newPostAuthor' type='text' ref={(author) => this.author = author}/>
        </div>
        <label>Category</label>
        { categories.length > 0
          ?
            <div>
              <select className='newPostCategory'
                onChange={(e) => this.category = e.target.value}>
                { categories.map(category => (
                  <option value={category.name} key={category.path}>{category.name}</option>
                ))}
              </select>
            </div>
          :
            <span className='categoriesNoResultsFound'>No categories found.</span>
        }
        <div className='newPostButtons'>
          <button className='newPostButton' onClick={this.onCancelHandler}>Cancel</button>
          <button className='newPostButton' onClick={this.onSaveHandler}>Save</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(addPost(post))
});

export default connect(null, mapDispatchToProps)(NewPost);
