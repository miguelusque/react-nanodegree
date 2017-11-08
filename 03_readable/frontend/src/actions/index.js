export const LOAD_POSTS = 'LOAD_POSTS';
export const SORT_POSTS_BY = 'SORT_POSTS_BY';
export const FILTER_POSTS_BY = 'FILTER_POSTS_BY';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const sortPostsBy = field => ({
  type: SORT_POSTS_BY,
  field
});

export const filterPostsBy = category => ({
  type: FILTER_POSTS_BY,
  category
});

export const updatePost = (postId, updatedFields) => ({
  type: UPDATE_POST,
  postId,
  updatedFields
});

export const deletePost = postId => ({
  type: DELETE_POST,
  postId
});
