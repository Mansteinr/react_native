import { combineReducers } from 'redux'
import theme from './theme'
import popular from './popular'
import trending from './trending'

import { rootCom, RootNavigator } from '../navigator/appNavigator'

// 1 指定默认的state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom))

/**
 * 创建自己的 navigation reducer
 */

const nvReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state)
  return nextState || state
}
 
/**
 * 3. 合并reducer
 */
const index = combineReducers({
  nav: nvReducer,
  theme: theme,
  popular: popular,
  trending: trending,
})
 
export default index