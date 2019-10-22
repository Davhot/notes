import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

const initialState = {
  categories: [
    {
      id: 1,
      name: 'Category 1',
      color: '#eee'
    }
  ],
  mode: 'show'
};

function rootReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      return { categories: action.json.data };
    case "CREATE_CATEGORY_SUCCESS":
      console.log(action)
      return {...state, categories: state.categories.concat([action.json]) };
    case "SET_EDIT_MODE_SUCCESS":
      return { ...state, mode: action.mode }
    case "SET_SHOW_MODE_SUCCESS":
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
