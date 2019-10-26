import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

const initialState = {
  categories: [],
  mode: 'show'
};

function rootReducer(state, action) {
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      return { ...state, categories: action.categories };
    case "CREATE_CATEGORY_SUCCESS":
      return {...state, categories: state.categories.concat([action.json]) };
    case "SET_MODE":
      return { ...state, mode: action.mode }
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
