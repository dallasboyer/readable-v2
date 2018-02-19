import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'

export const DELETE_COMMENT = "DELETE_COMMENT"
export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  comment
})
export const removeComment = id => dispatch => (
  API.deleteComment(id)
    .then(id => dispatch(deleteComment(id)))
)

export const RESET_COMMENTS = "RESET_COMMENTS"
export const resetComments = () => ({
  type: RESET_COMMENTS,
})

export const ADD_COMMENT = "ADD_COMMENT"
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

export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST"
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS"
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE"
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

export const VOTE_COMMENT_SUCCESS = "VOTE_COMMENT_SUCCESS"
export const voteCommentSuccess = comment => ({
  type: VOTE_COMMENT_SUCCESS,
  comment
})