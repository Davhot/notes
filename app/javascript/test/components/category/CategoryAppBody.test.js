import React from 'react';
import CategoryAppBody from 'app/javascript/components/category/CategoryAppBody';
import CategoryForm from 'app/javascript/components/category/CategoryForm';
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
  store = mockStore({ ...initialState, mode: 'index' });
  const wrapper_index = mount(<CategoryAppBody store={store}/>);
  it('should render .container', () => {
    expect(wrapper_index.find('.container').length).toBe(1);
  });

  store = mockStore({ ...initialState, mode: 'new' });
  const wrapper_new = shallow(<CategoryAppBody store={store}/>).dive().dive();
  it('should render CategoryForm', () => {
    expect(wrapper_new.find(CategoryForm).length).toBe(1);
  });
});
