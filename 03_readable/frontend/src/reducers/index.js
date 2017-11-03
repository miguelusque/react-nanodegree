import { LOAD_POSTS, FILTER_POSTS_BY_CATEGORY, SORT_POSTS_BY } from '../actions'

const initialPostsState = {
  posts: []
}

const posts = (state = initialPostsState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts:action.posts
      }

      case SORT_POSTS_BY:
      const result = {...state};

      // Sort posts
      result.posts.sort((a,b) => b[action.field] - a[action.field]);
      result.posts = result.posts.sort();

      return result;
    case FILTER_POSTS_BY_CATEGORY:
      // TODO: TBC
      break;
    default:
      return state;
  }
}

export default posts;
