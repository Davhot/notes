import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'

import CategoryApp from './category/CategoryApp'
import NoteApp from './note/NoteApp'

import configureStore from '../configureStore'
const store = configureStore()

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <CategoryApp/>} />
            <Route exact path="/notes" render={() => <NoteApp/>} />
            // TODO: 404/422/500
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
