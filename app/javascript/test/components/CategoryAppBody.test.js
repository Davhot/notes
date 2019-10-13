import React from 'react';
import CategoryAppBody from '../../components/CategoryAppBody';
import '../setupTests';
import { shallow } from 'enzyme';

describe('CategoryAppBody', () => {
  const wrapper_show = shallow(
    <CategoryAppBody mode='show'/>
  );
  it('should render .container', () => {
    expect(wrapper_show.find('.container').length).toBe(1);
  });
  const wrapper_edit = shallow(
    <CategoryAppBody mode='edit'/>
  );
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
