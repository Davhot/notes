import React from 'react';
import NoteAppBody from 'app/javascript/components/note/NoteAppBody';
import AddNoteForm from 'app/javascript/components/note/AddNoteForm';
import '../../setupTests';
import { shallow, mount } from 'enzyme';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configureStore from 'app/javascript/configureStore'

const initialState = configureStore().getState();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);

describe('NoteAppBody', () => {
  store = mockStore({ ...initialState, mode: 'index' });
  const wrapper_index = mount(<NoteAppBody store={store}/>);
  it('should render .container', () => {
    expect(wrapper_index.find('.container').length).toBe(1);
  });

  store = mockStore({ ...initialState, mode: 'new' });
  const wrapper_new = shallow(<NoteAppBody store={store}/>).dive().dive();
  it('should render AddNoteForm', () => {
    expect(wrapper_new.find(AddNoteForm).length).toBe(1);
  });
});
