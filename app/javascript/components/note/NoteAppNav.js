import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import images from '../images';
import Nav from "../Nav"
import { setMode, selectNotes } from "./NoteActions"
import { deleteNotesRequest } from "./NoteRequests"

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
      this.props.setMode('index')
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

  render_root_page() {
    location.href = '/'
  }

  render () {
    const mode = this.props.mode;
    let delete_mode_class = "delete-mode-btn";
    if (mode != 'delete') { delete_mode_class += " hidden" }
    let choose_all_btn_icon = this.isChoosenAll() ? "fa fa-check-square" : "fa fa-square";
    let buttons = {
      index: [
        <button key='1' id='choose-all-btn' className={delete_mode_class} onClick={this.chooseAllNotes}>
          <i className={choose_all_btn_icon}></i>
          choose all
        </button>,
        <button key='2' id='delete-btn' className={delete_mode_class} onClick={this.deleteNotes}>
          <i className="fa fa-times"></i>
          delete
        </button>,
        <button key='3' id='add-note-btn' onClick={() => this.props.setMode('editCategory')}>
          <i className="fa fa-edit"></i>
          edit category
        </button>,
        <button key='4' id='add-note-btn' onClick={() => this.props.setMode('new')}>
          <i className="fa fa-plus"></i>
          add note
        </button>,
        <button key='5' id='add-note-btn' onClick={() => this.render_root_page()}>
          cancel
        </button>
      ],
      new: [
        <button key='1' id='cancel-btn' onClick={() => this.props.setMode('index')}>
          cancel
        </button>
      ]
    };
    buttons.delete = buttons.index;
    buttons.edit = buttons.new;
    buttons.editCategory = buttons.new;

    return (
      <Nav>
        {buttons[mode]}
      </Nav>
    )
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode,
  notes: state => state.notes,
  notes: state => state.notes
});

const mapDispatchToProps = { setMode, selectNotes, deleteNotesRequest }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(NoteAppNav);
