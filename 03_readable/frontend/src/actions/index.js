export const FILTER_POSTS_BY_CATEGORY = 'FILTER_POSTS_BY_CATEGORY';
export const SORT_POSTS_BY = 'SORT_POSTS_BY';

export const filterPostsByCategory = category => ({
  type: FILTER_POSTS_BY_CATEGORY,
  category
});

export const sortPostsBy = field => ({
  type: SORT_POSTS_BY,
  field
});
