import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import { MemoryRouter } from 'react-router';
import { createBrowserHistory } from "history";

import App from 'app/javascript/components/App';
import NoteApp from 'app/javascript/components/note/NoteApp';
import CategoryApp from 'app/javascript/components/category/CategoryApp';

import '../setupTests';
import { shallow, mount } from 'enzyme';

import configureStore from 'app/javascript/configureStore'
const store = configureStore()

describe('App', () => {
  it('should render CategoryApp', () => {
    const history = createBrowserHistory();
    history.push('/');
    const wrapper = mount(
      <Router history={history}>
        <App/>
      </Router>
    );
    expect(wrapper.find(CategoryApp).length).toBe(1);
    expect(wrapper.find(NoteApp).length).toBe(0);
  });
  it('should render NoteApp', () => {
    const history = createBrowserHistory();
    history.push('/categories/1/notes');
    const wrapper = mount(
      <Router history={history}>
        <App/>
      </Router>
    );
    expect(wrapper.find(CategoryApp).length).toBe(0);
    expect(wrapper.find(NoteApp).length).toBe(1);
  });
});
