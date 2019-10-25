import React from 'react';
import AddCategoryForm from 'app/javascript/components/category/AddCategoryForm';
import { SketchPicker } from 'react-color'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import '../../setupTests';
import { mount } from 'enzyme';
import "isomorphic-fetch"

import configureStore from 'app/javascript/configureStore'
let store, wrapper;

beforeEach(()=>{
  store = configureStore();
  wrapper = mount(<AddCategoryForm store={store}/>);
});

describe('AddCategoryForm', () => {
  it('should render create category form', () => {
    expect(wrapper.find('form.category-form').length).toBe(1);
    expect(wrapper.find('input.category-body-input').length).toBe(1);
    expect(wrapper.find(SketchPicker).length).toBe(1);
  });
});
