import React from 'react';
import { Provider } from 'react-redux'

import NoteApp from 'app/javascript/components/note/NoteApp';
import NoteAppBody from 'app/javascript/components/note/NoteAppBody';
import NoteAppNav from 'app/javascript/components/note/NoteAppNav';
import Footer from 'app/javascript/components/Footer'
import '../../setupTests';
import { mount } from 'enzyme';

import configureStore from 'app/javascript/configureStore'

let store = configureStore();

describe('NoteApp', () => {
  const match = { params: { number: 1 } };
  const wrapper = mount(<Provider store={store}><NoteApp match={match}/></Provider>);
  it('should render components', () => {
    expect(wrapper.find(NoteAppNav).length).toBe(1);
    expect(wrapper.find(NoteAppBody).length).toBe(1);
    expect(wrapper.find(Footer).length).toBe(1);
  });
});
