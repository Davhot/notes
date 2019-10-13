import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CategoryApp from '../../components/CategoryApp';
import CategoryAppBody from '../../components/CategoryAppBody';
import CategoryAppNav from '../../components/CategoryAppNav';
import Footer from '../../components/Footer'
import '../setupTests';
import { shallow, mount } from 'enzyme';

import configureStore from '../../configureStore'
const store = configureStore()

describe('CategoryApp', () => {
  const initial_category_app = shallow(<CategoryApp store={store}/>);
  const category_app = function() { return shallow(<CategoryApp store={store}/>) };
  const wrapper = function() { return category_app().dive().dive() };
  it('should render components', () => {
    expect(wrapper().find(CategoryAppNav).length).toBe(1);
    expect(wrapper().find(CategoryAppBody).length).toBe(1);
    expect(wrapper().find(Footer).length).toBe(1);
  });
  const mode_edit = 'edit';
  it('should change mode to edit', () => {
    initial_category_app.dive().dive().find(CategoryAppNav).dive().find('#add-category-btn').simulate('click');

    expect(category_app().dive().prop('mode')).toBe(mode_edit);
    expect(wrapper().find(CategoryAppNav).prop('mode')).toBe(mode_edit);
    expect(wrapper().find(CategoryAppBody).prop('mode')).toBe(mode_edit);
    expect(wrapper().find(Footer).prop('mode')).toBe(mode_edit);
  });
  const mode_show = 'show';
  it('should change mode to show', () => {
    initial_category_app.dive().dive().find(CategoryAppNav).dive().find('#add-category-btn').simulate('click');
    wrapper().find(CategoryAppNav).dive().find('#cancel-btn').simulate('click');

    expect(category_app().dive().prop('mode')).toBe(mode_show);
    expect(wrapper().find(CategoryAppNav).prop('mode')).toBe(mode_show);
    expect(wrapper().find(CategoryAppBody).prop('mode')).toBe(mode_show);
    expect(wrapper().find(Footer).prop('mode')).toBe(mode_show);
  });
});
