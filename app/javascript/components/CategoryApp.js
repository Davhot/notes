import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom';

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "./Footer"

// TODO: refactoring
// 1. Сверстать Notes
// 2. Вынести все методы и states в отдельный файл
// 3. Реаргонизовать структуру приложения
// 4. Сохранять состояние category_mode между запросами

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
    category_mode: 'edit'
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
    category_mode: 'show'
  };
};

class CategoryApp extends React.Component {
  render () {
    const { category_mode, setEditMode, setShowMode } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <CategoryAppNav mode={category_mode} setEditMode={setEditMode} setShowMode={setShowMode}/>
        <CategoryAppBody mode={category_mode}/>
        <Footer mode={category_mode}/>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  category_mode: state => state.category_mode
});

const mapDispatchToProps = { setShowMode, setEditMode };

export default connect(structuredSelector, mapDispatchToProps)(CategoryApp);
