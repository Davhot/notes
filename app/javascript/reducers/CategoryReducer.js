function deepCloneOfNestedObject(nestedObject) {
  return JSON.parse(JSON.stringify(nestedObject));
}

export function category_reducer(state, action) {
  let categories, category;

  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      categories = action.categories
      categories.map(function(category){
        category.selected = false;
        return category;
      });
      return { ...state, categories: categories };
    case "CREATE_CATEGORY_SUCCESS":
      category = action.json;
      category.selected = false;
      return {...state, categories: state.categories.concat([category]) };
    case "EDIT_CATEGORY_SUCCESS":
      category = action.json;
      category.selected = false;
      categories = state.categories.filter(function(current_category) { return category.id != current_category.id });
      categories = deepCloneOfNestedObject(categories.concat([category]));
      return {...state, categories: categories };
    case "SET_MODE":
      return { ...state, mode: action.mode }
    case "SELECT_CATEGORIES":
      categories = state.categories;
      categories.map(function(category){
        if (action.category_ids.includes(category.id)) {
          category.selected = !category.selected
        }
        return category;
      });
      return {...state, categories: deepCloneOfNestedObject(categories) };
    case "DELETE_CATEGORIES_SUCCESS":
      let categories = state.categories.filter(function(category) { return !category.selected })
      return { ...state, categories: categories }
  }
  return null;
};
