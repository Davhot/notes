import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';

import Note from 'app/javascript/components/note/Note';
import '../../setupTests';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configureStore from 'app/javascript/configureStore'

const initialState = configureStore().getState();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);
let wrapper, note;

beforeEach(()=>{
  note = { id: 1, body: 'note', selected: false }
  store = mockStore({ ...initialState, categories: [note] });
  wrapper = mount(<Provider store={store}><Note note={note}/></Provider>);
});

describe('AddNoteForm', () => {
  it('should render create note form', () => {
    expect(wrapper.find('.card p').text()).toBe(note.body);
  });
});
