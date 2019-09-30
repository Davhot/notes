import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

const initialState = {
  categories: [
    {
      id: 1,
      name: 'Category 1',
      color: '#eee'
    }
  ]
};

function rootReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      return { categories: action.json.data };
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
