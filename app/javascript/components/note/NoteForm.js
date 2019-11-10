import React from 'react'
import Select from 'react-select';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "isomorphic-fetch"
import toaster from 'toasted-notes';

import { createNoteSuccess, editNoteSuccess, setMode } from "./NoteActions"

function createNoteRequest(data) {
  return dispatch => {
    return fetch(`/api/v1/categories/${data.category_id}/notes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => dispatch(createNoteSuccess(json)))
      .then(error => console.log(error));
  };
};

function editNoteRequest(data) {
  return dispatch => {
    return fetch(`/api/v1/notes/${data.note_id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)
    }).then(response => response)
      .then(json => dispatch(editNoteSuccess(data)))
      .then(error => console.log(error));
  };
};

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    let { categories, current_category_id } = this.props;
    this.options = [];
    var selectedOption;
    for(var i = 0; i < categories.length; i++) {
      let isSelected = (parseInt(categories[i].id) == parseInt(current_category_id));
      let option = { label: categories[i].name, value: categories[i].id };
      if (isSelected) { selectedOption = option }
      this.options.push(option);
    }
    this.state = {
      selectedOption: selectedOption,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const category_id = this.state.selectedOption.value
    const body = this.getBody.value
    const { mode, current_note_id } = this.props;

    let notify_message = null;
    let data = {
      id: new Date(),
      category_id,
      body
    }

    if (mode == 'new') {
      this.props.createNoteRequest(data);
      notify_message = 'Успешно создано!';
    } else {
      data.note_id = current_note_id;
      this.props.editNoteRequest(data);
      notify_message = 'Успешно обновлено!';
    }

    this.getBody.value = '';
    this.props.setMode('index');
    toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render () {
    // Смотря какой mode - edit или new
    let note_body = null;
    const { mode, current_note_id, notes } = this.props;
    if (mode == 'edit') {
      note_body = notes.filter(function(note) { return note.id == current_note_id })[0].body;
    }
    return (
      <form className="note-form" onSubmit={this.handleSubmit}>
        <div className="note-body">
          <Select value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.options} />
        </div>
        <div className="note-body">
          <textarea className="note-body-input"
                    ref={input => this.getBody = input}
                    placeholder="Please enter body..."
                    defaultValue={note_body}></textarea>
        </div>
        <input type="submit" className="form-button" value="Submit" />
      </form>
    )
  }
}

// обязательно указываем те параметры, которые используются для текущего компонента
// если нет функций для привязки, то можно просто через ф-ю, как в NoteAppBody
function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = { createNoteRequest, editNoteRequest, setMode }; // выносим методы отдельно от компонента

// благодаря connect() можно использовать dispatch
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(NoteForm);
