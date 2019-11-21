// Функции обращения к API

import React from "react";
import cookie from 'react-cookies'

import {
  getNotesSuccess,
  createNoteSuccess,
  editNoteSuccess,
  deleteNotesSuccess
} from "./NoteActions"

function redirect_on_unauthorize(response) {
  if (response.status == 401) {
    cookie.remove('Authorization')
    location.href = '/login';
  }
  return response;
}

export function getNotesRequest(category_id) {
  return dispatch => {
    return fetch(`/api/v1/categories/${category_id}/notes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // no-referrer, *client
    }).then(response => redirect_on_unauthorize(response))
      .then(response => response.json())
      .then(json => dispatch(getNotesSuccess(json.data)))
      .catch(error => console.log(error));
  }
};

export function createNoteRequest(data) {
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
    }).then(response => redirect_on_unauthorize(response))
      .then(response => response.json())
      .then(json => dispatch(createNoteSuccess(json)))
      .then(error => console.log(error));
  };
};

export function editNoteRequest(data) {
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
    }).then(response => redirect_on_unauthorize(response))
      .then(response => response)
      .then(json => dispatch(editNoteSuccess(data)))
      .then(error => console.log(error));
  };
};

export function deleteNotesRequest(note_ids) {
  return dispatch => {
    return fetch('/api/v1/notes/multiple_destroy', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(note_ids)
    }).then(response => redirect_on_unauthorize(response))
      .then(response => dispatch(deleteNotesSuccess()))
      .catch(error => console.log(error));
  }
};
