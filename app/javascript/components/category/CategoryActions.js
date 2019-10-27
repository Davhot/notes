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

export function deleteCategories() {
  // TODO: делать через REQUEST/SUCCESS
  return dispatch => {
    return dispatch({ type: 'DELETE_CATEGORIES' });
  };
}
