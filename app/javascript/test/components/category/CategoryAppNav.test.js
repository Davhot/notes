import React from 'react';
import CategoryAppNav from 'app/javascript/components/category/CategoryAppNav';
import '../../setupTests';
import { shallow } from 'enzyme';

describe('CategoryAppBody', () => {
  const wrapper = shallow(<CategoryAppNav mode='show'/>);
  it('should render 3 buttons', () => {
    expect(wrapper.find('#choose-all-btn').length).toBe(1);
    expect(wrapper.find('#delete-btn').length).toBe(1);
    expect(wrapper.find('#add-category-btn').length).toBe(1);
  });
  const wrapper_edit = shallow(
    <CategoryAppNav mode='edit'/>
  );
  it('should render cancel button', () => {
    expect(wrapper_edit.find('#cancel-btn').length).toBe(1);
  });
});
