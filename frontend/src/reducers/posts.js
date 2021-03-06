import {
  // posts
  CHANGE_SORT_ORDER,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILURE,
  // comments
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/actionTypes'

const initState = {
  posts: [],
  isFetching: false,
  error: null,
  sortBy: "-timestamp",
  isVoting: false,
}

export const posts = (state = initState, action) => {

  const {
    post,
    posts,
    error,
    sortBy,
    comment,
  } = action

  switch (action.type) {
    case ADD_COMMENT:
      let newPost = state.posts.filter(p => p.id === comment.parentId).pop()
      newPost.commentCount += 1
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== comment.parentId).concat(newPost)
      }
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
    case UPDATE_POST:
      let updatedPost = action.post
      return {
        ...state,
        posts: state.posts.filter(x => x.id !== action.post.id).concat(updatedPost)
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => action.post.id !== post.id)
      }
    case DELETE_COMMENT:
      let commentRemovedFromPost = state.posts.filter(p => p.id === comment.parentId).pop()
      commentRemovedFromPost.commentCount -= 1
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== comment.parentId).concat(commentRemovedFromPost)
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
    case VOTE_REQUEST:
      return {
        ...state,
        isVoting: true,
      }
    case VOTE_SUCCESS:
      return {
        ...state,
        isVoting: false,
        posts: state.posts.filter(p => p.id !== action.post.id).concat(action.post)
      }
    case VOTE_FAILURE:
      return {
        ...state,
        isVoting: false,
        error
      }      
    default:
      return state
  }
}