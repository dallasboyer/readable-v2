import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'

import {
  voteCommentSuccess,
} from './comments'

export const DELETE_POST = "DELETE_POST"
export const deletePost = post => ({
  type: DELETE_POST,
  post
})
export const removePost = post => dispatch => (
  API.deletePost(post)
    .then(post => dispatch(deletePost(post)))
)

export const CHANGE_SORT_ORDER = "CHANGE_SORT_ORDER"
export const changeSortOrder = sortBy => ({
  type: CHANGE_SORT_ORDER,
  sortBy
})

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

export const VOTE_REQUEST = "VOTE_REQUEST"
export const VOTE_SUCCESS = "VOTE_SUCCESS"
export const VOTE_FAILURE = "VOTE_FAILURE"
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