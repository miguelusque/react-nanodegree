import { ACTIONS } from '../actions';
import { SORTABLE_FIELDS } from '../components/SortPostsBy';

const initialPostsState = {
  posts: [],
  postsCache: [],
  sortedBy: SORTABLE_FIELDS.score,
  filteredBy: ''
}

const posts = (state = initialPostsState, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_POSTS:
      // When loading posts, sort then by the initial sorting field (state.sortedBy)
      return {
        ...state,
        posts: dressPostsUp(action.posts, state.sortedBy, action.category),
        postsCache: action.posts
      };
    case ACTIONS.SORT_POSTS_BY:
      return {
        ...state,
        posts: dressPostsUp(state.postsCache, action.field),
        sortedBy: action.field
      };
    case ACTIONS.FILTER_POSTS_BY:
      return {
        ...state,
        posts: action.category === ''
          ? dressPostsUp(state.postsCache, state.sortedBy)
          : dressPostsUp(state.postsCache, state.sortedBy, action.category),
        filteredBy: action.category
      };
    case ACTIONS.ADD_POST:
      const postsAfterAdd = [
        ...state.postsCache,
        action.post
      ];

      return {
        ...state,
        posts: dressPostsUp(postsAfterAdd, state.sortedBy, state.filteredBy),
        postsCache : postsAfterAdd
      };
    case ACTIONS.UPDATE_POST:
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
    case ACTIONS.DELETE_POST:
      const postsAfterDelete = [...state.postsCache.filter(post => post.id !== action.postId) ];

      return {
        ...state,
        posts: dressPostsUp(postsAfterDelete, state.sortedBy, state.filteredBy),
        postsCache: postsAfterDelete
      };
    case ACTIONS.UPDATE_POST_VOTE_SCORE:
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
    case ACTIONS.UPDATE_COMMENT_COUNT:
      const postsAfterUpdateCommentCount = [
        ...state.postsCache.filter(post => post.id !== action.parentId),
        {
          ...state.postsCache.filter(post => post.id === action.parentId)[0],
          commentCount:action.commentCount
        }
      ];

      return {
        ...state,
        posts: dressPostsUp(postsAfterUpdateCommentCount, state.sortedBy, state.filteredBy),
        postsCache: postsAfterUpdateCommentCount
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
