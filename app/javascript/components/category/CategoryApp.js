import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "../Footer"
import { setEditModeSuccess, setShowModeSuccess, getCategoriesSuccess } from "./CategoryActions"

// TODO:
// Сделать работающее приложение
// 1. Создание категории (осталось: при создании переход на главную со всплывашкой 'успешно')
// 2. Отображение категории (осталось: тесты!!!)
// 3. Выбор категорий по одной или все сразу и удаление
// 4. Создание заметки
// 5. Отображение заметки
// 6. Удаление заметок
// 7. Редактирование категории
// 8. Редактирование заметки
// 9. Кнопка количества блоков на странице
// 10. Пагинация

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
