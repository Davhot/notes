import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import images from '../images';
import Nav from "../Nav"
import { setMode, selectNotes, deleteNotesSuccess } from "./NoteActions"

function deleteNotesRequest(note_ids) {
  return dispatch => {
    return fetch('/api/v1/notes/multiple_destroy', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(note_ids)
    }).then(response => dispatch(deleteNotesSuccess()))
      .catch(error => console.log(error));
  }
};

class NoteAppNav extends React.Component {
  constructor(props) {
    super(props);
    this.chooseAllNotes = this.chooseAllNotes.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
  }

  chooseAllNotes() {
    let notes, note_ids;
    if(!this.isChoosenAll()) {
      notes = this.props.notes.filter(function(note) { return !note.selected });
    } else {
      notes = this.props.notes;
      this.props.setMode('show')
    }
    note_ids = notes.map(function(note){ return note.id })
    this.props.selectNotes(note_ids);
  }

  isChoosenAll() {
    let n = this.props.notes.length;
    let n_selected = this.props.notes.filter(function(note) { return note.selected }).length
    return n == n_selected
  }

  deleteNotes() {
    var note_ids = this.props.notes.filter(function(note) { return note.selected })
                                   .map(function(note) { return note.id });
    note_ids = { note: { ids: note_ids } };
    this.props.deleteNotesRequest(note_ids);
  }

  render () {
    const mode = this.props.mode;
    let delete_mode_class = "delete-mode-btn";
    if (mode != 'delete') { delete_mode_class += " hidden" }
    let choose_all_btn_icon = this.isChoosenAll() ? "fa fa-check-square" : "fa fa-square";
    if (mode == 'show' || mode == 'delete') {
      return (
        <Nav>
        <button id='choose-all-btn' className={delete_mode_class} onClick={this.chooseAllNotes}>
          <i className={choose_all_btn_icon}></i>
          choose all
        </button>
        <button id='delete-btn' className={delete_mode_class} onClick={this.deleteNotes}>
          <i className="fa fa-times"></i>
          delete
        </button>
          <button id='add-note-btn' onClick={() => this.props.setMode('edit')}>
            <i className="fa fa-plus"></i>
            add note
          </button>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <button id='cancel-btn' onClick={() => this.props.setMode('show')}>
            cancel
          </button>
        </Nav>
      )
    }
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode,
  notes: state => state.notes,
  notes: state => state.notes
});

const mapDispatchToProps = { setMode, selectNotes, deleteNotesRequest, deleteNotesSuccess }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(NoteAppNav);
