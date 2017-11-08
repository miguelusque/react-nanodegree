import { LOAD_POSTS, SORT_POSTS_BY, FILTER_POSTS_BY, UPDATE_POST, DELETE_POST } from '../actions'
import { SORTABLE_FIELDS } from '../components/SortPostsBy'

const initialPostsState = {
  posts: [],
  postsCache: [],
  sortedBy: SORTABLE_FIELDS.score,
  filteredBy: ''
}

const posts = (state = initialPostsState, action) => {
  console.log('Action', action);
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
        ...state.postsCache.filter(post => post.id !== action.updatedFields.id),
        {
          ...state.posts.filter(post => post.id === action.updatedFields.id)[0],
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


    default:
      return state;
  }
}

// This function dresses the posts up (sorts and filters them if requested).
const dressPostsUp = (posts, sortedBy, filteredBy) => {
  let result = [...posts];
  if (sortedBy) {
    console.log("sortedBy");
    result.sort((a,b) => b[sortedBy] - a[sortedBy])
  }

  if (filteredBy) {
    console.log("filteredBy");
    result = result.filter(post => post.category === filteredBy)
  }

  console.log(result);
  return result;
}

export default posts;
