import React from 'react';
import CategoryAppNav from 'app/javascript/components/category/CategoryAppNav';
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

describe('CategoryAppBody', () => {
  it('should render 3 buttons', () => {
    store = mockStore({ ...initialState, mode: 'show' });
    wrapper = mount(<CategoryAppNav store={store}/>);

    expect(wrapper.find('#choose-all-btn').length).toBe(1);
    expect(wrapper.find('#delete-btn').length).toBe(1);
    expect(wrapper.find('#add-category-btn').length).toBe(1);
  });

  it('should render cancel button', () => {
    store = mockStore({ ...initialState, mode: 'edit' });
    wrapper = mount(<CategoryAppNav store={store}/>);

    expect(wrapper.find('#cancel-btn').length).toBe(1);
  });
});
