import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'

import Category from './Category'
import Test from './Test'

import configureStore from '../configureStore'
const store = configureStore()

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Category/>} />
            <Route path="/test" render={() => <Test/>} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
