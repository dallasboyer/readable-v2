import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'

import {
  voteCommentSuccess,
} from './comments'

import {
  DELETE_POST,
  CHANGE_SORT_ORDER,
  ADD_POST,
  UPDATE_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILURE,
} from './actionTypes'


export const deletePost = post => ({
  type: DELETE_POST,
  post
})
export const removePost = post => dispatch => (
  API.deletePost(post)
    .then(post => dispatch(deletePost(post)))
)


export const changeSortOrder = sortBy => ({
  type: CHANGE_SORT_ORDER,
  sortBy
})


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


export const updatePost = post => ({
  type: UPDATE_POST,
  post
})
export const editPost = post => dispatch => {
  return API.editPost(post)
    .then(post => dispatch(updatePost(post)))
}


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


export const voteRequest = () => ({
  type: VOTE_REQUEST
})
export const voteSuccess = post => ({
  type: VOTE_SUCCESS,
  post
})
export const voteFailure = error => ({
  type: VOTE_FAILURE,
  error
})
export const vote = (itemType, id, option) => dispatch => {
  dispatch(voteRequest())
  return API.vote(itemType, id, option)
    .then((response) => {
      itemType === "post"
        ? dispatch(voteSuccess(response))
        : dispatch(voteCommentSuccess(response))
    })
    .catch(error => dispatch(voteFailure()))
}