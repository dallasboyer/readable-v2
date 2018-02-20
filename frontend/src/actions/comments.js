import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'
import {
  DELETE_COMMENT,
  RESET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  VOTE_COMMENT_SUCCESS,
} from './actionTypes'

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  comment
})
export const removeComment = id => dispatch => (
  API.deleteComment(id)
    .then(id => dispatch(deleteComment(id)))
)


export const resetComments = () => ({
  type: RESET_COMMENTS,
})


export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})
export const newComment = comment => dispatch => {
  comment = {
    ...comment,
    id: Helpers.createObjectId(),
    timestamp: Date.now()
  }
  return API.createComment(comment)
    .then(comment => dispatch(addComment(comment)))
}


export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
})
export const editComment = comment => dispatch => {
  comment = {
    ...comment,
    timestamp: Date.now()
  }
  return API.editComment(comment)
    .then(comment => dispatch(updateComment(comment)))
}


export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST
})
export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  comments
})
export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  error
})
export const fetchComments = (parentId) => dispatch => {
  dispatch(fetchCommentsRequest())
  return API.fetchComments(parentId)
    .then(comments => dispatch(fetchCommentsSuccess(comments)))
    .catch(error => dispatch(fetchCommentsFailure(error)))
}


export const voteCommentSuccess = comment => ({
  type: VOTE_COMMENT_SUCCESS,
  comment
})