import React from "react";
import { connect } from "react-redux";

import images from '../images';
import AddNoteForm from './AddNoteForm'
import { setMode, selectCategories } from "./NoteActions"

class Note extends React.Component {
  redirect_to_notes() {
    if (this.props.mode == 'show') {
      window.location.href = `notes/${this.props.note.id}/notes`
    } else {
      this.props.selectCategories([this.props.note.id]);
      let count_selected_notes = this.props.notes.filter(function(note) { return note.selected });
      if(count_selected_notes.length == 0) {
        this.props.setMode('show');
      }
    }
  }

  long_press_card_mouseup() {
    clearTimeout(this.pressTimer);
    return false;
  }

  long_press_card_mousedown() {
    const self = this;
    this.pressTimer = window.setTimeout(function() {
      self.props.setMode('delete');
    }, 500);
    return false;
  }

  render () {
    let note_class = "note-card card noselect";
    if (this.props.note.selected) { note_class += " checked" }
    return (
      <div className={note_class}
           onMouseUp={() => this.long_press_card_mouseup()}
           onMouseDown={() => this.long_press_card_mousedown()}
           onClick={() => this.redirect_to_notes()}>
        <p className="notes-content">{this.props.note.body}</p>
      </div>
    )
  }
}

const mapDispatchToProps = { setMode, selectCategories }; // выносим методы отдельно от компонента

export default connect(null, mapDispatchToProps)(Note);
