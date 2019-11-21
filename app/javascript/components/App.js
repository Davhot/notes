import React from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Provider } from 'react-redux'

import CategoryApp from './category/CategoryApp'
import NoteApp from './note/NoteApp'
import Login from './Login'

import configureStore from '../configureStore'
const store = configureStore()

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={CategoryApp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/categories/:number/notes" component={NoteApp} />
            // TODO: 404/422/500
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
