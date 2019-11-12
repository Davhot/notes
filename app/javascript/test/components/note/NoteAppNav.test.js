import React from 'react';
import NoteAppNav from 'app/javascript/components/note/NoteAppNav';
import '../../setupTests';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configureStore from 'app/javascript/configureStore'

const initialState = configureStore().getState();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);
let wrapper;

describe('NoteAppBody', () => {
  it('should render 3 buttons', () => {
    store = mockStore({ ...initialState, mode: 'index' });
    wrapper = mount(<NoteAppNav store={store}/>);

    expect(wrapper.find('#choose-all-btn').length).toBe(1);
    expect(wrapper.find('#delete-btn').length).toBe(1);
    expect(wrapper.find('#add-note-btn').length).toBe(2);
  });

  it('should render cancel button', () => {
    store = mockStore({ ...initialState, mode: 'new' });
    wrapper = mount(<NoteAppNav store={store}/>);

    expect(wrapper.find('#cancel-btn').length).toBe(1);
  });
});
