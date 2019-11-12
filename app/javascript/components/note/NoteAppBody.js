import React from "react";
import images from '../images';
import Select from 'react-select';
import { connect } from "react-redux";

import Note from './Note'
import NoteForm from './NoteForm'
import CategoryForm from '../category/CategoryForm'

class NoteAppBody extends React.Component {
  render () {
    const mode = this.props.mode;
    const { current_note_id, notes } = this.props;
    let note_body;
    if (notes.length > 0 && current_note_id){
      note_body = notes.filter(function(note) { return note.id == current_note_id })[0].body;
    }
    let body = {
      index: (this.props.notes.length > 1 ? this.props.notes.map((note) => <Note key={note.id} note={note} />) : 'Нет заметок.'),
      new: <NoteForm/>,
      show:
        <div className="note-body">
          <p>{note_body}</p>
        </div>,
      editCategory: <CategoryForm/>
    }
    body.delete = body.index;
    body.edit = body.new;

    return (
      <div className="container">
        {body[mode]}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(NoteAppBody);
