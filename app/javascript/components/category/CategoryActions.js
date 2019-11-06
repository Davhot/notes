export function createCategorySuccess(json) {
  return {
    type: 'CREATE_CATEGORY_SUCCESS',
    json
  };
};

export function getCategoriesSuccess(data) {
  return {
    type: 'GET_CATEGORIES_SUCCESS',
    categories: data
  };
};

export function deleteCategoriesSuccess(){
  return { type: 'DELETE_CATEGORIES_SUCCESS' };
}

export function setMode(mode) {
  const params = {
    type: 'SET_MODE',
    mode: mode
  }
  return dispatch => {
    return dispatch(params);
  };
};

export function selectCategories(category_ids) {
  const params = {
    type: 'SELECT_CATEGORIES',
    category_ids: category_ids
  }
  return dispatch => {
    return dispatch(params);
  };
}
