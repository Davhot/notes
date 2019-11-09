import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import images from '../images';
import Nav from "../Nav"
import { setMode, selectNotes, deleteNotesSuccess } from "./NoteActions"

function deleteNotesRequest(category_ids) {
  return dispatch => {
    return fetch('api/v1/categories/multiple_destroy', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(category_ids)
    }).then(response => dispatch(deleteNotesSuccess()))
      .catch(error => console.log(error));
  }
};

class NoteAppNav extends React.Component {
  render () {
    const mode = this.props.mode;
    if (mode == 'show') {
      return (
        <Nav>
          <a id='choose-all-btn' className="delete-mode-btn hidden" href="#">
            <i className="fa fa-square"></i>
            choose all
          </a>
          <a id='delete-btn' className="delete-mode-btn hidden" href="#">
            <i className="fa fa-times"></i>
            delete
          </a>
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
  categories: state => state.categories,
  notes: state => state.notes
});

const mapDispatchToProps = { setMode, selectNotes, deleteNotesRequest, deleteNotesSuccess }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(NoteAppNav);
