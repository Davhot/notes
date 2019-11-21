// Функции обращения к API

import React from "react";
import cookie from 'react-cookies'
import toaster from 'toasted-notes';

import {
  getCategoriesSuccess,
  createCategorySuccess,
  editCategorySuccess,
  deleteCategoriesSuccess
} from "./CategoryActions"

function redirect_on_unauthorize(response) {
  if (response.status == 401) {
    cookie.remove('Authorization')
    location.href = '/login';
  }
  return response;
}

function show_toaster_message(notify_message) {
  toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
}

function set_mode(mode) {
  return {
    type: 'SET_MODE',
    mode: mode
  }
}

export function getCategoriesRequest() {
  return dispatch => {
    return fetch('/api/v1/categories', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // no-referrer, *client
    }).then(response => redirect_on_unauthorize(response))
      .then(response => response.json())
      .then(json => dispatch(getCategoriesSuccess(json.data)))
      .catch(error => console.log(error));
  }
};

export function createCategoryRequest(data) {
  return dispatch => {
    return fetch('/api/v1/categories', {
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
      .then(json => dispatch(createCategorySuccess(json)))
      .then(json => dispatch(set_mode('index')))
      .then(show_toaster_message('Успешно создано!'))
      .then(error => console.log(error));
  };
};

export function editCategoryRequest(data) {
  return dispatch => {
    return fetch(`/api/v1/categories/${data.category_id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)
    }).then(response => redirect_on_unauthorize(response))
      .then(response => response.json())
      .then(json => dispatch(editCategorySuccess(json)))
      .then(json => dispatch(set_mode('index')))
      .then(show_toaster_message('Успешно обновлено!'))
      .then(error => console.log(error));
  };
};

export function deleteCategoriesRequest(category_ids) {
  return dispatch => {
    return fetch('/api/v1/categories/multiple_destroy', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(category_ids)
    }).then(response => redirect_on_unauthorize(response))
      .then(response => dispatch(deleteCategoriesSuccess()))
      .catch(error => console.log(error));
  }
};
