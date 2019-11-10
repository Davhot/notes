function deepCloneOfNestedObject(nestedObject) {
  return JSON.parse(JSON.stringify(nestedObject));
}

export function note_reducer(state, action) {
  let notes, current_note;

  switch (action.type) {
    case "GET_NOTES_SUCCESS":
      notes = action.notes;
      notes.map(function(note){
        note.selected = false;
        return note;
      });
      return { ...state, notes: notes };
    case "CREATE_NOTE_SUCCESS":
      current_note = action.json;
      if (state.notes.filter(function(note) { return note.id === current_note.id }).length > 0) {
        return null;
      }
      current_note.selected = false;
      notes = deepCloneOfNestedObject(state.notes.concat([current_note]));
      return {...state, notes: notes };
    case "EDIT_NOTE_SUCCESS":
      current_note = action.json;
      current_note.selected = false;
      // удаляем текущие заметки с id = обновлённой заметки
      notes = state.notes.filter(function(note) { return note.id != current_note.id });
      // добавляем заметку в общий список
      notes = deepCloneOfNestedObject(state.notes.concat([current_note]));
      return {...state, notes: notes };
    case "SELECT_NOTES":
      notes = state.notes;
      notes.map(function(note){
        if (action.note_ids.includes(note.id)) {
          note.selected = !note.selected
        }
        return note;
      });
      return {...state, notes: deepCloneOfNestedObject(notes) };
    case "DELETE_NOTES_SUCCESS":
      let notes = state.notes.filter(function(note) { return !note.selected })
      return { ...state, notes: notes }
    case "SET_CURRENT_CATEGORY_ID":
      return {...state, current_category_id: action.current_category_id };
    case "SET_CURRENT_NOTE_ID":
      return {...state, current_note_id: action.current_note_id }
  }
  return null;
};
