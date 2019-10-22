import React from 'react';
import CategoryAppBody from 'app/javascript/components/category/CategoryAppBody';
import AddCategoryForm from 'app/javascript/components/category/AddCategoryForm';
import '../../setupTests';
import { shallow } from 'enzyme';

describe('CategoryAppBody', () => {
  const wrapper_show = shallow(<CategoryAppBody mode='show'/>);
  it('should render .container', () => {
    expect(wrapper_show.find('.container').length).toBe(1);
  });
  const wrapper_edit = shallow(
    <CategoryAppBody mode='edit'/>
  );
  console.log(wrapper_edit.debug())
  it('should render AddCategoryForm', () => {
    expect(wrapper_edit.find(AddCategoryForm).length).toBe(1);
  });
});
