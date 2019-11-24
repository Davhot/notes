import React from "react";
import { connect } from "react-redux";

import images from '../images';
import NoteForm from './NoteForm'
import { setMode, selectNotes, setCurrentNoteId } from "./NoteActions"

class Note extends React.Component {
  constructor() {
    super()
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
  }

  redirect_to_notes() {
    if (this.props.mode == 'index') {
      this.props.setMode('edit');
      this.props.setCurrentNoteId(this.props.note.id);
    } else {
      this.props.selectNotes([this.props.note.id]);
      let count_selected_notes = this.props.notes.filter(function(note) { return note.selected });
      if(count_selected_notes.length == 0) {
        this.props.setMode('index');
      }
    }
  }

  handleButtonPress() {
    const self = this;
    this.buttonPressTimer = setTimeout(() => self.props.setMode('delete'), 500);
  }

  handleButtonRelease () {
    clearTimeout(this.buttonPressTimer);
  }

  render () {
    let note_class = "note-card card noselect";
    if (this.props.note.selected) { note_class += " checked" }
    return (
      <div className={note_class}
           onClick={() => this.redirect_to_notes()}
           onTouchStart={this.handleButtonPress}
           onTouchEnd={this.handleButtonRelease}
           onMouseDown={this.handleButtonPress}
           onMouseUp={this.handleButtonRelease}
           onMouseLeave={this.handleButtonRelease}>
        <p className="notes-content">{this.props.note.body}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = { setMode, selectNotes, setCurrentNoteId }; // выносим методы отдельно от компонента

export default connect(mapStateToProps, mapDispatchToProps)(Note);
