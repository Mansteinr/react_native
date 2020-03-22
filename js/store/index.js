import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk' // 实现异步action
import reducers from '../reducer'
import { middleware } from '../navigator/appNavigator'
// import action from '../action'

// 自定义插件
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function')
  } else {
    console.log('dispatching ', action)
  }
  const result = next(action)
  console.log('nextState', store.getState())
}

const middlewares = [
  middleware,
  logger,
  thunk
]
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares))