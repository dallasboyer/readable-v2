import * as API from '../utils/API'
import * as Helpers from '../utils/helpers'

export const ADD_POST = "ADD_POST"
export const addPost = post => ({
  type: ADD_POST,
  post
})
export const newPost = post => dispatch => {
  post = {
    ...post,
    id: Helpers.createObjectId(),
    timestamp: Date.now()
  }
  return API.createPost(post)
    .then(post => dispatch(addPost(post)))
}

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