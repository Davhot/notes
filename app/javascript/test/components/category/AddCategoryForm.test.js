import React from 'react';
import AddCategoryForm from 'app/javascript/components/category/AddCategoryForm';
import '../../setupTests';
import { shallow } from 'enzyme';

describe('AddCategoryForm', () => {
  const wrapper_edit = shallow(<AddCategoryForm/>);
  it('should render .category-body-input', () => {
    expect(wrapper_edit.find('.category-body-input').length).toBe(1);
  });
  it('should render #colorpicker-wrapper', () => {
    expect(wrapper_edit.find('#colorpicker-wrapper').length).toBe(1);
  });
  it('should render .category-button', () => {
    expect(wrapper_edit.find('.category-button').length).toBe(1);
  });
});
