import * as API from '../utils/API'

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