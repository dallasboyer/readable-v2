import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  DELETE_COMMENT,
  RESET_COMMENTS,
} from '../actions/comments'

const initState = {
  comments: [],
  isFetching: false,
  error: null,
}

export const comments = (state = initState, action) => {

  const {
    comments,
    comment,
    error,
  } = action

  switch (action.type) {
    case RESET_COMMENTS:
      return {
        ...state,
        comments: [],
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== comment.id)
      }
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments,
      }
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
      }
    default:
      return state
  }
}