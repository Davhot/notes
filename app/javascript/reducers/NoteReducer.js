function deepCloneOfNestedObject(nestedObject) {
  return JSON.parse(JSON.stringify(nestedObject));
}

export function note_reducer(state, action) {
  let notes, note;

  switch (action.type) {
    case "GET_NOTES_SUCCESS":
      notes = action.notes;
      notes.map(function(note){
        note.selected = false;
        return note;
      });
      return { ...state, notes: notes };
    case "CREATE_NOTE_SUCCESS":
      note = action.json;
      note.selected = false;
      notes = deepCloneOfNestedObject(state.notes.concat([note]));
      if (state.notes.filter(function(note) { return note.id === note.id }).length > 0){
        return null;
      } else {
        return {...state, notes: notes };
      }
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
  }
  return null;
};
