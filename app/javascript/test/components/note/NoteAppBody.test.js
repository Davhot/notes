import React from 'react';
import NoteAppBody from 'app/javascript/components/note/NoteAppBody';
import '../../setupTests';
import { shallow } from 'enzyme';

describe('NoteAppBody', () => {
  const wrapper_show = shallow(<NoteAppBody mode='show'/>);
  it('should render .container', () => {
    expect(wrapper_show.find('.container').length).toBe(1);
  });
  const wrapper_edit = shallow(
    <NoteAppBody mode='edit'/>
  );
  it('should render .note-body-input', () => {
    expect(wrapper_edit.find('.note-body-input').length).toBe(1);
  });
  it('should render .note-button', () => {
    expect(wrapper_edit.find('.note-button').length).toBe(1);
  });
});
