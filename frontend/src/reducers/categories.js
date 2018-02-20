import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/actionTypes'

const initState = {
  categories: [],
  isFetching: false,
  error: null,
}

export const categories = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      const { isFetching } = action
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      const { categories } = action
      return {
        ...state,
        isFetching: false,
        categories,
      };
    case FETCH_CATEGORIES_FAILURE:
      const { error } = action
      return {
        ...state,
        isFetching: false,
        error,
      };
    default:
      return state;
  }
}