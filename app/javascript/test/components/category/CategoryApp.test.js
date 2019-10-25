import React from 'react';
import { Provider } from 'react-redux'

import CategoryApp from 'app/javascript/components/category/CategoryApp';
import CategoryAppBody from 'app/javascript/components/category/CategoryAppBody';
import CategoryAppNav from 'app/javascript/components/category/CategoryAppNav';
import Footer from 'app/javascript/components/Footer'
import '../../setupTests';
import { mount } from 'enzyme';

import configureStore from 'app/javascript/configureStore'

let store = configureStore();

describe('CategoryApp', () => {
  const wrapper = mount(<Provider store={store}><CategoryApp/></Provider>);
  it('should render components', () => {
    expect(wrapper.find(CategoryAppNav).length).toBe(1);
    expect(wrapper.find(CategoryAppBody).length).toBe(1);
    expect(wrapper.find(Footer).length).toBe(1);
  });
});
