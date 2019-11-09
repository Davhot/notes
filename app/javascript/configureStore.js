import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { category_reducer } from './reducers/CategoryReducer'
import { note_reducer } from './reducers/NoteReducer'

const initialState = {
  categories: [],
  notes: [],
  mode: 'show',
  current_category_id: null
};

function rootReducer(state, action) {
  const reducers = [category_reducer, note_reducer];

  for (let reducer of reducers) {
    let res = reducer(state, action);
    if (res) { return res; }
  }

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
