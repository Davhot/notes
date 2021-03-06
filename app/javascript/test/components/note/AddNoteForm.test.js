import React from 'react';
import NoteForm from 'app/javascript/components/note/NoteForm';
import Select from 'react-select';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import '../../setupTests';
import { mount } from 'enzyme';
import "isomorphic-fetch"

import configureStore from 'app/javascript/configureStore'
let store, wrapper;

beforeEach(()=>{
  store = configureStore();
  wrapper = mount(<NoteForm store={store}/>);
});

describe('NoteForm', () => {
  it('should render create note form', () => {
    expect(wrapper.find('form.note-form').length).toBe(1);
    expect(wrapper.find('textarea.note-body-input').length).toBe(1);
    expect(wrapper.find(Select).length).toBe(1);
  });
});
