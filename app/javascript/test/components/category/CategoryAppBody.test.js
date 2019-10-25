import React from 'react';
import CategoryAppBody from 'app/javascript/components/category/CategoryAppBody';
import AddCategoryForm from 'app/javascript/components/category/AddCategoryForm';
import '../../setupTests';
import { shallow, mount } from 'enzyme';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configureStore from 'app/javascript/configureStore'

const initialState = configureStore().getState();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);

describe('CategoryAppBody', () => {
  store = mockStore({ ...initialState, mode: 'show' });
  const wrapper_show = mount(<CategoryAppBody store={store}/>);
  it('should render .container', () => {
    expect(wrapper_show.find('.container').length).toBe(1);
  });

  store = mockStore({ ...initialState, mode: 'edit' });
  const wrapper_edit = shallow(<CategoryAppBody store={store}/>).dive().dive();
  it('should render AddCategoryForm', () => {
    expect(wrapper_edit.find(AddCategoryForm).length).toBe(1);
  });
});

// TODO: добавить тест, что отображаются категории
