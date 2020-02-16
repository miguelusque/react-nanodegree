const SERVER = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';
const HEADERS = { headers: {
  'Authorization': 'Lorem ipsum',
  'Content-Type': 'application/json',
  Accept: 'application/json'}
};

// This method retrieves the list of posts (by category if not empty).
export const loadPosts = (category = '') => {
  const url = category === '' ?
    `${SERVER}/posts` :
    `${SERVER}/:${category}/posts`;

  return fetch(url, HEADERS)
    .then(checkStatus)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method retrieved the list of categories.
export const loadCategories = () => {
  const url = `${SERVER}/categories`;

  return fetch(url, HEADERS)
    .then(checkStatus)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method adds a new post to the list of posts
export const addPost = post => {
  const url = `${SERVER}/posts`;

  return fetch(url, {...HEADERS, method: 'post', body: JSON.stringify(post)})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method updates a post
export const updatePost = (postId, updatedFields) => {
  const url = `${SERVER}/posts/${postId}`;

  return fetch(url, {...HEADERS, method: 'put', body: JSON.stringify(updatedFields)})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method deletes a post
export const deletePost = postId => {
  const url = `${SERVER}/posts/${postId}`;

  return fetch(url, {...HEADERS, method: 'delete'})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method loads the comments  a post
export const loadComments = postId => {
  const url = `${SERVER}/posts/${postId}/comments`;

  return fetch(url, HEADERS)
  .then(checkStatus)
  .then(res => (res.ok ? res.json() : []))
  .catch(() => []);
}

// This method adds a new post to the list of posts
export const addComment = comment => {
  const url = `${SERVER}/comments`;

  return fetch(url, {...HEADERS, method: 'post', body: JSON.stringify(comment)})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method updates the post's voteScore
export const updatePostVoteScore = (postId, option) => {
  const url = `${SERVER}/posts/${postId}`;

  return fetch(url, {...HEADERS, method: 'post', body: JSON.stringify(option)})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method updates a comment
export const updateComment = (commentId, updatedFields) => {
  const url = `${SERVER}/comments/${commentId}`;

  return fetch(url, {...HEADERS, method: 'put', body: JSON.stringify(updatedFields)})
    .then(checkStatus)
    .catch(error => console.log(error));
}


// This method updates the comment's voteScore
export const updateCommentVoteScore = (commentId, option) => {
  const url = `${SERVER}/comments/${commentId}`;

  return fetch(url, {...HEADERS, method: 'post', body: JSON.stringify(option)})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method deletes a comment
export const deleteComment = commentId => {
  const url = `${SERVER}/comments/${commentId}`;

  return fetch(url, {...HEADERS, method: 'delete'})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method handles response status
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
