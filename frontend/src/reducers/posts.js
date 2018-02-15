import {
  ADD_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../actions/posts'

const initState = {
  posts: [],
  isFetching: false,
  error: null,
}

export const posts = (state = initState, action) => {

  const {
    post,
    posts,
    error,
  } = action

  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(post)
      }
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts,
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
      }
    default:
      return state
  }
}