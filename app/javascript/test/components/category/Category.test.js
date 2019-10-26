import React from 'react';
import Category from 'app/javascript/components/category/Category';
import '../../setupTests';
import { mount } from 'enzyme';

import configureStore from 'app/javascript/configureStore'
let store, wrapper, category;

beforeEach(()=>{
  category = { id: 1, color: '#fff', name: 'category' }
  store = configureStore(category);
  wrapper = mount(<Category category={category}/>);
});

describe('AddCategoryForm', () => {
  it('should render create category form', () => {
    expect(wrapper.find('.card p').text()).toBe(category.name);
  });
});
