import React from "react";
import images from '../images';
import Select from 'react-select';
import { connect } from "react-redux";

import Note from './Note'
import AddNoteForm from './AddNoteForm'

class NoteAppBody extends React.Component {
  render () {
    const mode = this.props.mode;
    if (mode == 'index' || mode == 'delete') {
      if (this.props.notes.length > 1) {
        return (
          <div className="container">
            {this.props.notes.map((note) => <Note key={note.id} note={note} />)}
          </div>
        )
      } else {
        return (
          <div className="container">
            <div>
              <p>Нет заметок.</p>
            </div>
          </div>
        )
      }
    } else if (mode == 'new') {
      return (
        <div className="container">
          <AddNoteForm/>
        </div>
      )
    } else if (mode == 'show') {
      const { current_note_id, notes } = this.props
      const note_body = notes.filter(function(note) { return note.id == current_note_id })[0].body;
      return (
        <div className="container">
          <div className="note-body">
            <p>{note_body}</p>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    notes: state.notes,
    current_note_id: state.current_note_id
  }
}

export default connect(mapStateToProps)(NoteAppBody);
