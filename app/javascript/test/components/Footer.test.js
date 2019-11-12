import React from 'react';
import Footer from '../../components/Footer';
import '../setupTests';
import { mount } from 'enzyme';

import configureStore from 'app/javascript/configureStore'

let store = configureStore();

describe('Footer', () => {
  const wrapper = mount(<Footer store={store}/>);
  it('should render #change-block-btn-wrapper', () => {
    expect(wrapper.find('footer').length).toBe(1);
  });
});
