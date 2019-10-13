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
    case "SET_EDIT_MODE_SUCCESS":
      return action;
    case "SET_SHOW_MODE_SUCCESS":
      return action;
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
