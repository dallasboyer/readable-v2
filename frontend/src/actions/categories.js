import * as API from '../utils/API'

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST"
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE"

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST
})

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
})

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  error
})

export const fetchCategories = () => dispatch => {
  dispatch(fetchCategoriesRequest())
  return API.fetchCategories()
    .then(categories => dispatch(fetchCategoriesSuccess(categories)))
    .catch(error => dispatch(fetchCategoriesFailure(error)))
}