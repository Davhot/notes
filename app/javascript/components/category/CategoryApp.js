import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "../Footer"

// TODO:
// Сделать работающее приложение
// 1. Создание категории
// 2. Отображение категории
// 3. Выбор категорий по одной или все сразу и удаление
// 4. Создание заметки
// 5. Отображение заметки
// 6. Удаление заметок
// 7. Редактирование категории
// 8. Редактирование заметки
// 9. Кнопка количества блоков на странице
// 10. Пагинация

const SET_EDIT_MODE_REQUEST = 'SET_EDIT_MODE_REQUEST';
const SET_EDIT_MODE_SUCCESS = 'SET_EDIT_MODE_SUCCESS';

function setEditMode() {
  console.log('setEditMode Action!');
  return dispatch => {
    dispatch({ type: SET_EDIT_MODE_REQUEST });
    return dispatch(setEditModeSuccess());
  };
};

export function setEditModeSuccess() {
  console.log('setEditModeSuccess Action!');
  return {
    type: SET_EDIT_MODE_SUCCESS,
    mode: 'edit'
  };
};

const SET_SHOW_MODE_REQUEST = 'SET_SHOW_MODE_REQUEST';
const SET_SHOW_MODE_SUCCESS = 'SET_SHOW_MODE_SUCCESS';

function setShowMode() {
  console.log('setShowMode Action!');
  return dispatch => {
    dispatch({ type: SET_SHOW_MODE_REQUEST });
    return dispatch(setShowModeSuccess());
  };
};

export function setShowModeSuccess() {
  console.log('setShowModeSuccess Action!');
  return {
    type: SET_SHOW_MODE_SUCCESS,
    mode: 'show'
  };
};

class CategoryApp extends React.Component {
  render () {
    const { mode, setEditMode, setShowMode } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <CategoryAppNav mode={mode} setEditMode={setEditMode} setShowMode={setShowMode}/>
        <CategoryAppBody mode={mode}/>
        <Footer mode={mode}/>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

const mapDispatchToProps = { setShowMode, setEditMode };

export default connect(structuredSelector, mapDispatchToProps)(CategoryApp);
