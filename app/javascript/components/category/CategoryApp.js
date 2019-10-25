import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "../Footer"
import { setEditModeSuccess, setShowModeSuccess, getCategoriesSuccess } from "./CategoryActions"

// TODO:
// Сделать работающее приложение
// 1. Тесты на список категорий
// 2. установка mode в одну функцию

// 1. Выбор категорий по одной или все сразу и удаление
// 2. Создание заметки
// 3. Отображение заметки
// 4. Удаление заметок
// 5. Редактирование категории
// 6. Редактирование заметки
// 7. Кнопка количества блоков на странице
// 8. Пагинация
// 9. безопасность апишки по токену

const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
function loadCategories() {
  return dispatch => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    return fetch('api/v1/categories', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // no-referrer, *client
    }).then(response => response.json())
      .then(json => dispatch(getCategoriesSuccess(json.data)))
      .catch(error => console.log(error));
  }
};

const SET_EDIT_MODE_REQUEST = 'SET_EDIT_MODE_REQUEST';
function setEditMode() {
  return dispatch => {
    dispatch({ type: SET_EDIT_MODE_REQUEST });
    return dispatch(setEditModeSuccess());
  };
};

const SET_SHOW_MODE_REQUEST = 'SET_SHOW_MODE_REQUEST';
function setShowMode() {
  return dispatch => {
    dispatch({ type: SET_SHOW_MODE_REQUEST });
    return dispatch(setShowModeSuccess());
  };
};

class CategoryApp extends React.Component {
  render () {
    this.props.loadCategories();
    const { mode, setEditMode, setShowMode } = this.props;
    return (
      <React.Fragment>
        <CategoryAppNav mode={mode} setEditMode={setEditMode} setShowMode={setShowMode}/>
        <CategoryAppBody/>
        <Footer mode={mode}/>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

const mapDispatchToProps = { setShowMode, setEditMode, loadCategories }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(CategoryApp);
