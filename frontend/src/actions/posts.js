import * as API from '../utils/API'

export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST
})
export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
})
export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  error
})
export const fetchPosts = () => dispatch => {
  dispatch(fetchPostsRequest())
  return API.fetchPosts()
    .then(posts => dispatch(fetchPostsSuccess(posts)))
    .catch(error => dispatch(fetchPostsFailure(error)))
}