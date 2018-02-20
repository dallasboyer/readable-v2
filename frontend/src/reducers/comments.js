import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  DELETE_COMMENT,
  RESET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  VOTE_COMMENT_SUCCESS,
} from '../actions/actionTypes'

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
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(comment)
      }
    case UPDATE_COMMENT:
      let updatedComment = action.comment
      return {
        ...state,
        comments: state.comments.filter(x => x.id !== action.comment.id).concat(updatedComment)
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
    case VOTE_COMMENT_SUCCESS:
      return {
        ...state,
        isVoting: false,
        comments: state.comments.filter(c => c.id !== action.comment.id).concat(action.comment)
      }
    default:
      return state
  }
}