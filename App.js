

import React from 'react'
import { createAppContainer } from 'react-navigation'

import { Provider } from 'react-redux'
import AppNavigator from './js/navigator/appNavigator'
import store from './js/store'
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <AppContainer />
    </Provider>
  }
}
