const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export function createCategorySuccess(json) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    json
  };
};

const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export function getCategoriesSuccess(data) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories: data
  };
};

const SET_MODE = 'SET_MODE';
export function setMode(mode) {
  const params = {
    type: SET_MODE,
    mode: mode
  }
  return dispatch => {
    return dispatch(params);
  };
};
