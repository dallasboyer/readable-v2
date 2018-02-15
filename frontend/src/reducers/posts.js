import {
  CHANGE_SORT_ORDER,
  ADD_POST,
  DELETE_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../actions/posts'

const initState = {
  posts: [],
  isFetching: false,
  error: null,
  sortBy: "-timestamp",
}

export const posts = (state = initState, action) => {

  const {
    post,
    posts,
    error,
    sortBy,
  } = action

  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return {
        ...state,
        sortBy
      }
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(post)
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => action.post.id !== post.id)
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