import React from 'react';
import NoteAppNav from 'app/javascript/components/note/NoteAppNav';
import '../../setupTests';
import { shallow } from 'enzyme';

describe('NoteAppNav', () => {
  const wrapper = shallow(<NoteAppNav mode='show'/>);
  it('should render 3 buttons', () => {
    expect(wrapper.find('#choose-all-btn').length).toBe(1);
    expect(wrapper.find('#delete-btn').length).toBe(1);
    expect(wrapper.find('#add-note-btn').length).toBe(1);
  });
  const wrapper_edit = shallow(
    <NoteAppNav mode='edit'/>
  );
  it('should render cancel button', () => {
    expect(wrapper_edit.find('#cancel-btn').length).toBe(1);
  });
});
