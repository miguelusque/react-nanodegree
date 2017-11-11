import { LOAD_POSTS, SORT_POSTS_BY, FILTER_POSTS_BY, UPDATE_POST, DELETE_POST, UPDATE_POST_VOTE_SCORE } from '../actions';
import { SORTABLE_FIELDS } from '../components/SortPostsBy';

const initialPostsState = {
  posts: [],
  postsCache: [],
  sortedBy: SORTABLE_FIELDS.score,
  filteredBy: ''
}

const posts = (state = initialPostsState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      // When loading posts, sort then by the initial sorting field (state.sortedBy)
      return {
        ...state,
        posts: dressPostsUp(action.posts, state.sortedBy),
        postsCache: action.posts
      };
    case SORT_POSTS_BY:
      return {
        ...state,
        posts: dressPostsUp(state.postsCache, action.field),
        sortedBy: action.field
      };
    case FILTER_POSTS_BY:
      return {
        ...state,
        posts: action.category === ''
          ? dressPostsUp(state.postsCache, state.sortedBy)
          : dressPostsUp(state.postsCache, state.sortedBy, action.category),
        filteredBy: action.category
      };
    case UPDATE_POST:
      const postsAfterUpdate = [
        ...state.postsCache.filter(post => post.id !== action.postId),
        {
          ...state.posts.filter(post => post.id === action.postId)[0],
          ...action.updatedFields
        }];

      return {
        ...state,
        posts: dressPostsUp(postsAfterUpdate, state.sortedBy, state.filteredBy),
        postsCache: postsAfterUpdate
      };
    case DELETE_POST:
      const postsAfterDelete = [...state.postsCache.filter(post => post.id !== action.postId) ];

      return {
        ...state,
        posts: dressPostsUp(postsAfterDelete, state.sortedBy, state.filteredBy),
        postsCache: postsAfterDelete
      };
    case UPDATE_POST_VOTE_SCORE:
      const postsAfterUpdateVoteScore = [
        ...state.postsCache.filter(post => post.id !== action.postId),
        {
         ...state.postsCache.filter(post => post.id === action.postId)[0],
         voteScore:action.voteScore
        }
      ];

      return {
        ...state,
        posts: dressPostsUp(postsAfterUpdateVoteScore, state.sortedBy, state.filteredBy),
        postsCache: postsAfterUpdateVoteScore
      };
    default:
      return state;
  }
}

// This function dresses the posts up (sorts and filters them if requested).
const dressPostsUp = (posts, sortedBy, filteredBy) => {
  let result = [...posts];
  if (sortedBy) {
    result.sort((a,b) => b[sortedBy] - a[sortedBy])
  }

  if (filteredBy) {
    result = result.filter(post => post.category === filteredBy)
  }

  return result;
}

export default posts;
