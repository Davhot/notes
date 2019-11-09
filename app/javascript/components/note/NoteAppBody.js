import React from "react";
import images from '../images';
import Select from 'react-select';
import { connect } from "react-redux";

import Note from './Note'
import AddNoteForm from './AddNoteForm'

class NoteAppBody extends React.Component {
  redirect_to_notes() {
    window.location.href = '/notes'
  }

  render () {
    const mode = this.props.mode;
    if (mode == 'show' || mode == 'delete') {
      return (
        <div className="container">
          {this.props.notes.map((note) => <Note key={note.id} note={note} />)}
        </div>
      )
    } else {
      return (
        <div className="container">
          <AddNoteForm/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    notes: state.notes
  }
}

export default connect(mapStateToProps)(NoteAppBody);
