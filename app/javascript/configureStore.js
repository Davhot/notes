import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

const initialState = {
  categories: [],
  mode: 'show'
};

function deepCloneOfNestedObject(nestedObject) {
  return JSON.parse(JSON.stringify(nestedObject));
}

function rootReducer(state, action) {
  let categories, category;

  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      categories = action.categories
      categories.map(function(category){
        category.selected = false;
        return category;
      });
      return { ...state, categories: categories };
    case "CREATE_CATEGORY_SUCCESS":
      category = action.json;
      category.selected = false;
      return {...state, categories: state.categories.concat([category]) };
    case "SET_MODE":
      return { ...state, mode: action.mode }
    case "SELECT_CATEGORIES":
      categories = state.categories;
      categories.map(function(category){
        if (action.category_ids.includes(category.id)) {
          category.selected = !category.selected
        }
        return category;
      });
      return {...state, categories: deepCloneOfNestedObject(categories) };
    case "DELETE_CATEGORIES_SUCCESS":
      let categories = state.categories.filter(function(category) { return !category.selected })
      return { ...state, categories: categories }
  };
  return state;
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  return store;
};
