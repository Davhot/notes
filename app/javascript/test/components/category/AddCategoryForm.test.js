import React from 'react';
import CategoryForm from 'app/javascript/components/category/CategoryForm';
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
  wrapper = mount(<CategoryForm store={store}/>);
});

describe('CategoryForm', () => {
  it('should render create category form', () => {
    expect(wrapper.find('form.category-form').length).toBe(1);
    expect(wrapper.find('input.category-body-input').length).toBe(1);
    expect(wrapper.find(SketchPicker).length).toBe(1);
  });
});
