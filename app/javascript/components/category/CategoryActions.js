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

const SET_EDIT_MODE_SUCCESS = 'SET_EDIT_MODE_SUCCESS';
export function setEditModeSuccess() {
  return {
    type: SET_EDIT_MODE_SUCCESS,
    mode: 'edit'
  };
};

const SET_SHOW_MODE_SUCCESS = 'SET_SHOW_MODE_SUCCESS';
export function setShowModeSuccess() {
  return {
    type: SET_SHOW_MODE_SUCCESS,
    mode: 'show'
  };
};
