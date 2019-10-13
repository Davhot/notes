import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import NoteApp from '../../components/NoteApp';
import NoteAppBody from '../../components/NoteAppBody';
import NoteAppNav from '../../components/NoteAppNav';
import Footer from '../../components/Footer'
import '../setupTests';
import { shallow, mount } from 'enzyme';

import configureStore from '../../configureStore'
const store = configureStore()

describe('NoteApp', () => {
  const initial_note_app = shallow(<NoteApp store={store}/>);
  const note_app = function() { return shallow(<NoteApp store={store}/>) };
  const wrapper = function() { return note_app().dive().dive() };
  it('should render components', () => {
    expect(wrapper().find(NoteAppNav).length).toBe(1);
    expect(wrapper().find(NoteAppBody).length).toBe(1);
    expect(wrapper().find(Footer).length).toBe(1);
  });
  const mode_edit = 'edit';
  it('should change mode to edit', () => {
    initial_note_app.dive().dive().find(NoteAppNav).dive().find('#add-note-btn').simulate('click');

    expect(note_app().dive().prop('mode')).toBe(mode_edit);
    expect(wrapper().find(NoteAppNav).prop('mode')).toBe(mode_edit);
    expect(wrapper().find(NoteAppBody).prop('mode')).toBe(mode_edit);
    expect(wrapper().find(Footer).prop('mode')).toBe(mode_edit);
  });
  const mode_show = 'show';
  it('should change mode to show', () => {
    initial_note_app.dive().dive().find(NoteAppNav).dive().find('#add-note-btn').simulate('click');
    wrapper().find(NoteAppNav).dive().find('#cancel-btn').simulate('click');

    expect(note_app().dive().prop('mode')).toBe(mode_show);
    expect(wrapper().find(NoteAppNav).prop('mode')).toBe(mode_show);
    expect(wrapper().find(NoteAppBody).prop('mode')).toBe(mode_show);
    expect(wrapper().find(Footer).prop('mode')).toBe(mode_show);
  });
});
