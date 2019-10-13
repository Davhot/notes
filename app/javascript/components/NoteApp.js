import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom';

import NoteAppNav from "./NoteAppNav"
import NoteAppBody from "./NoteAppBody"
import Footer from "./Footer"

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

class NoteApp extends React.Component {
  render () {
    const { mode, setEditMode, setShowMode } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <NoteAppNav mode={mode} setEditMode={setEditMode} setShowMode={setShowMode}/>
        <NoteAppBody mode={mode}/>
        <Footer mode={mode}/>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

const mapDispatchToProps = { setShowMode, setEditMode };

export default connect(structuredSelector, mapDispatchToProps)(NoteApp);
