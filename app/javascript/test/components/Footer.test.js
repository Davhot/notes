import React from 'react';
import Footer from '../../components/Footer';
import '../setupTests';
import { shallow } from 'enzyme';

describe('Footer', () => {
  const wrapper = shallow(
    <Footer mode='show'/>
  );
  it('should render #change-block-btn-wrapper', () => {
    expect(wrapper.find('#change-block-btn-wrapper').length).toBe(1);
  });
});
