export const ACTIONS = {
  LOAD_POSTS: 'LOAD_POSTS',
  SORT_POSTS_BY: 'SORT_POSTS_BY',
  FILTER_POSTS_BY: 'FILTER_POSTS_BY',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  UPDATE_POST_VOTE_SCORE: 'UPDATE_POST_VOTE_SCORE',
  UPDATE_COMMENT_COUNT: 'UPDATE_COMMENT_COUNT'
};

export const loadPosts = posts => ({
  type: ACTIONS.LOAD_POSTS,
  posts
});

export const sortPostsBy = field => ({
  type: ACTIONS.SORT_POSTS_BY,
  field
});

export const filterPostsBy = category => ({
  type: ACTIONS.FILTER_POSTS_BY,
  category
});

export const addPost = post => ({
  type: ACTIONS.ADD_POST,
  post
});

export const updatePost = (postId, updatedFields) => ({
  type: ACTIONS.UPDATE_POST,
  postId,
  updatedFields
});

export const deletePost = postId => ({
  type: ACTIONS.DELETE_POST,
  postId
});

export const updatePostVoteScore = (postId, voteScore) => ({
  type: ACTIONS.UPDATE_POST_VOTE_SCORE,
  postId,
  voteScore
});

export const updateCommentCount = (parentId, commentCount) => ({
  type: ACTIONS.UPDATE_COMMENT_COUNT,
  parentId,
  commentCount
});
