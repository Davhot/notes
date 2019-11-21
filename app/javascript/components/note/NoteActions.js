// Функции для Redux

export function createNoteSuccess(json) {
  return {
    type: 'CREATE_NOTE_SUCCESS',
    json
  };
};

export function editNoteSuccess(json) {
  return {
    type: 'EDIT_NOTE_SUCCESS',
    json
  };
};

export function getNotesSuccess(data) {
  return {
    type: 'GET_NOTES_SUCCESS',
    notes: data
  };
};

export function deleteNotesSuccess(){
  return { type: 'DELETE_NOTES_SUCCESS' };
}

export function setMode(mode) {
  const params = {
    type: 'SET_MODE',
    mode: mode
  }
  return dispatch => {
    return dispatch(params);
  };
};

export function selectNotes(category_ids) {
  const params = {
    type: 'SELECT_NOTES',
    note_ids: category_ids
  }
  return dispatch => {
    return dispatch(params);
  };
}

export function setCurrentCategoryId(current_category_id) {
  return dispatch => {
    return dispatch({
      type: 'SET_CURRENT_CATEGORY_ID',
      current_category_id: current_category_id
    });
  };
}

export function setCurrentNoteId(current_note_id) {
  return dispatch => {
    return dispatch({
      type: 'SET_CURRENT_NOTE_ID',
      current_note_id: current_note_id
    });
  };
}
