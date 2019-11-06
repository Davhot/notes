import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';

import Category from 'app/javascript/components/category/Category';
import '../../setupTests';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configureStore from 'app/javascript/configureStore'

const initialState = configureStore().getState();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);
let wrapper, category;

beforeEach(()=>{
  category = { id: 1, color: '#fff', name: 'category', selected: false }
  store = mockStore({ ...initialState, categories: [category] });
  wrapper = mount(<Provider store={store}><Category category={category}/></Provider>);
});

describe('AddCategoryForm', () => {
  it('should render create category form', () => {
    expect(wrapper.find('.card p').text()).toBe(category.name);
  });
});
